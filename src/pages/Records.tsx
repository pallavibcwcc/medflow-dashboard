import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable, Column } from '@/components/ui/data-table';
import { mockMedicalRecords } from '@/data/mockData';
import { MedicalRecord } from '@/types/medical';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MedicalRecordForm } from '@/components/forms/MedicalRecordForm';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const columns: Column<MedicalRecord>[] = [
  {
    key: 'date',
    label: 'Date',
    sortable: true,
    render: (value) => format(new Date(value), 'MMM dd, yyyy'),
  },
  {
    key: 'patientName',
    label: 'Patient',
    sortable: true,
  },
  {
    key: 'diagnosis',
    label: 'Diagnosis',
    render: (value) => (
      <span className="max-w-xs truncate block">{value}</span>
    ),
  },
  {
    key: 'treatment',
    label: 'Treatment',
    render: (value) => (
      <span className="max-w-xs truncate block text-muted-foreground">{value}</span>
    ),
  },
  {
    key: 'prescriptions',
    label: 'Prescriptions',
    render: (value: string[]) => (
      <div className="flex flex-wrap gap-1">
        {value.slice(0, 2).map((rx, i) => (
          <Badge key={i} variant="secondary" className="text-xs">
            {rx}
          </Badge>
        ))}
        {value.length > 2 && (
          <Badge variant="outline" className="text-xs">
            +{value.length - 2}
          </Badge>
        )}
      </div>
    ),
  },
  {
    key: 'doctorName',
    label: 'Doctor',
    sortable: true,
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (_, row) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <FileText className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

const Records = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <DashboardLayout title="Medical Records" subtitle="View and manage patient medical history">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Total of {mockMedicalRecords.length} records</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Medical Record</DialogTitle>
              </DialogHeader>
              <MedicalRecordForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <DataTable
          data={mockMedicalRecords}
          columns={columns}
          searchKey="patientName"
          searchPlaceholder="Search by patient name..."
        />
      </div>
    </DashboardLayout>
  );
};

export default Records;
