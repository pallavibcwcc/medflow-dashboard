import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable, Column } from '@/components/ui/data-table';
import { mockPatients } from '@/data/mockData';
import { Patient } from '@/types/medical';
import { Button } from '@/components/ui/button';
import { Plus, Eye, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { PatientForm } from '@/components/forms/PatientForm';
import { format } from 'date-fns';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const columns: Column<Patient>[] = [
  {
    key: 'name',
    label: 'Patient',
    sortable: true,
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {value.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-muted-foreground">{row.email}</p>
        </div>
      </div>
    ),
  },
  {
    key: 'phone',
    label: 'Phone',
  },
  {
    key: 'dateOfBirth',
    label: 'Date of Birth',
    sortable: true,
    render: (value) => format(new Date(value), 'MMM dd, yyyy'),
  },
  {
    key: 'gender',
    label: 'Gender',
    render: (value) => (
      <span className="capitalize">{value}</span>
    ),
  },
  {
    key: 'bloodGroup',
    label: 'Blood Group',
    render: (value) => (
      <span className="px-2 py-1 rounded bg-destructive/10 text-destructive text-xs font-semibold">
        {value}
      </span>
    ),
  },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className={cn(
        'px-2.5 py-1 rounded-full text-xs font-medium',
        value === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
      )}>
        {value}
      </span>
    ),
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
        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];

const Patients = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <DashboardLayout title="Patients" subtitle="Manage patient records">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">Total of {mockPatients.length} patients registered</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Register New Patient</DialogTitle>
              </DialogHeader>
              <PatientForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <DataTable
          data={mockPatients}
          columns={columns}
          searchKey="name"
          searchPlaceholder="Search patients..."
          filters={[
            {
              key: 'status',
              label: 'Status',
              options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ],
            },
            {
              key: 'gender',
              label: 'Gender',
              options: [
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ],
            },
          ]}
        />
      </div>
    </DashboardLayout>
  );
};

export default Patients;
