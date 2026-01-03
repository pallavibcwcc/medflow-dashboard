import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable, Column } from '@/components/ui/data-table';
import { mockGynaeRecords } from '@/data/mockData';
import { GynaeRecord } from '@/types/medical';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, Baby, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { GynaeRecordForm } from '@/components/forms/GynaeRecordForm';
import { format } from 'date-fns';

const visitTypeStyles: Record<string, string> = {
  prenatal: 'bg-info/10 text-info',
  postnatal: 'bg-success/10 text-success',
  routine: 'bg-accent text-accent-foreground',
  emergency: 'bg-destructive/10 text-destructive',
};

const columns: Column<GynaeRecord>[] = [
  {
    key: 'date',
    label: 'Visit Date',
    sortable: true,
    render: (value) => format(new Date(value), 'MMM dd, yyyy'),
  },
  {
    key: 'patientName',
    label: 'Patient',
    sortable: true,
  },
  {
    key: 'visitType',
    label: 'Visit Type',
    render: (value) => (
      <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium capitalize', visitTypeStyles[value])}>
        {value}
      </span>
    ),
  },
  {
    key: 'gestationalAge',
    label: 'Gestational Age',
    render: (value) => value ? (
      <div className="flex items-center gap-2">
        <Baby className="w-4 h-4 text-primary" />
        <span>{value}</span>
      </div>
    ) : '-',
  },
  {
    key: 'fetalHeartRate',
    label: 'Fetal Heart Rate',
    render: (value) => value ? (
      <div className="flex items-center gap-2">
        <Heart className="w-4 h-4 text-destructive" />
        <span>{value}</span>
      </div>
    ) : '-',
  },
  {
    key: 'bloodPressure',
    label: 'Blood Pressure',
  },
  {
    key: 'weight',
    label: 'Weight',
  },
  {
    key: 'nextVisit',
    label: 'Next Visit',
    sortable: true,
    render: (value) => value ? format(new Date(value), 'MMM dd, yyyy') : '-',
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
      </div>
    ),
  },
];

const Gynae = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <DashboardLayout title="Gynae Records" subtitle="Obstetrics & Gynecology patient records">
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card-medical">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-info/10">
                <Baby className="w-6 h-6 text-info" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prenatal Cases</p>
                <p className="text-2xl font-display font-bold">24</p>
              </div>
            </div>
          </div>
          <div className="card-medical">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <Heart className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Postnatal Cases</p>
                <p className="text-2xl font-display font-bold">18</p>
              </div>
            </div>
          </div>
          <div className="card-medical">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Baby className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Due This Month</p>
                <p className="text-2xl font-display font-bold">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Total of {mockGynaeRecords.length} gynae records</p>
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
                <DialogTitle>Add Gynae Record</DialogTitle>
              </DialogHeader>
              <GynaeRecordForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <DataTable
          data={mockGynaeRecords}
          columns={columns}
          searchKey="patientName"
          searchPlaceholder="Search by patient name..."
          filters={[
            {
              key: 'visitType',
              label: 'Visit Type',
              options: [
                { value: 'prenatal', label: 'Prenatal' },
                { value: 'postnatal', label: 'Postnatal' },
                { value: 'routine', label: 'Routine' },
                { value: 'emergency', label: 'Emergency' },
              ],
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
};

export default Gynae;
