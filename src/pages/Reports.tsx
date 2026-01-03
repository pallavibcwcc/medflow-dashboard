import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable, Column } from '@/components/ui/data-table';
import { mockReports } from '@/data/mockData';
import { Report } from '@/types/medical';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, Download, FileText, Image, FlaskConical, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReportForm } from '@/components/forms/ReportForm';
import { format } from 'date-fns';
import { ReportPreview } from '@/components/reports/ReportPreview';

const statusStyles: Record<string, string> = {
  pending: 'badge-warning',
  completed: 'badge-success',
  reviewed: 'badge-info',
};

const typeIcons: Record<string, typeof FileText> = {
  lab: FlaskConical,
  imaging: Image,
  pathology: File,
  other: FileText,
};

const columns: Column<Report>[] = [
  {
    key: 'date',
    label: 'Date',
    sortable: true,
    render: (value) => format(new Date(value), 'MMM dd, yyyy'),
  },
  {
    key: 'type',
    label: 'Type',
    render: (value) => {
      const Icon = typeIcons[value] || FileText;
      return (
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="capitalize">{value}</span>
        </div>
      );
    },
  },
  {
    key: 'title',
    label: 'Report Title',
    sortable: true,
  },
  {
    key: 'patientName',
    label: 'Patient',
    sortable: true,
  },
  {
    key: 'doctorName',
    label: 'Doctor',
    sortable: true,
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className={cn(statusStyles[value])}>
        {value}
      </span>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => <ReportActions report={row} />,
  },
];

function ReportActions({ report }: { report: Report }) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = () => {
    // Simulate download
    const content = `
Report: ${report.title}
Patient: ${report.patientName}
Date: ${report.date}
Doctor: ${report.doctorName}
Type: ${report.type}
Status: ${report.status}

Findings:
${report.findings || 'No findings recorded.'}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/\s+/g, '_')}_${report.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-center gap-1">
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report Preview</DialogTitle>
          </DialogHeader>
          <ReportPreview report={report} />
        </DialogContent>
      </Dialog>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <Edit className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
        <Download className="w-4 h-4" />
      </Button>
    </div>
  );
}

const Reports = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <DashboardLayout title="Reports" subtitle="View and manage medical reports">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="card-medical">
            <p className="text-sm text-muted-foreground">Total Reports</p>
            <p className="text-2xl font-display font-bold mt-1">{mockReports.length}</p>
          </div>
          <div className="card-medical">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-display font-bold mt-1 text-warning">
              {mockReports.filter(r => r.status === 'pending').length}
            </p>
          </div>
          <div className="card-medical">
            <p className="text-sm text-muted-foreground">Completed</p>
            <p className="text-2xl font-display font-bold mt-1 text-success">
              {mockReports.filter(r => r.status === 'completed').length}
            </p>
          </div>
          <div className="card-medical">
            <p className="text-sm text-muted-foreground">Reviewed</p>
            <p className="text-2xl font-display font-bold mt-1 text-info">
              {mockReports.filter(r => r.status === 'reviewed').length}
            </p>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Manage all medical reports</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Report
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Report</DialogTitle>
              </DialogHeader>
              <ReportForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <DataTable
          data={mockReports}
          columns={columns}
          searchKey="patientName"
          searchPlaceholder="Search by patient name..."
          filters={[
            {
              key: 'status',
              label: 'Status',
              options: [
                { value: 'pending', label: 'Pending' },
                { value: 'completed', label: 'Completed' },
                { value: 'reviewed', label: 'Reviewed' },
              ],
            },
            {
              key: 'type',
              label: 'Type',
              options: [
                { value: 'lab', label: 'Lab' },
                { value: 'imaging', label: 'Imaging' },
                { value: 'pathology', label: 'Pathology' },
                { value: 'other', label: 'Other' },
              ],
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
