import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DataTable, Column } from '@/components/ui/data-table';
import { mockAppointments } from '@/data/mockData';
import { Appointment } from '@/types/medical';
import { Button } from '@/components/ui/button';
import { Plus, Calendar as CalendarIcon, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const statusStyles: Record<string, string> = {
  scheduled: 'badge-info',
  completed: 'badge-success',
  cancelled: 'badge-destructive',
  'no-show': 'badge-warning',
};

const typeLabels: Record<string, string> = {
  consultation: 'Consultation',
  'follow-up': 'Follow-up',
  emergency: 'Emergency',
  'routine-checkup': 'Checkup',
  gynae: 'Gynae',
};

const columns: Column<Appointment>[] = [
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
    key: 'date',
    label: 'Date',
    sortable: true,
    render: (value) => format(new Date(value), 'MMM dd, yyyy'),
  },
  {
    key: 'time',
    label: 'Time',
    sortable: true,
  },
  {
    key: 'type',
    label: 'Type',
    render: (value) => (
      <span className="px-2 py-1 rounded-lg bg-accent text-accent-foreground text-xs font-medium">
        {typeLabels[value] || value}
      </span>
    ),
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
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">View</Button>
        <Button variant="ghost" size="sm">Edit</Button>
      </div>
    ),
  },
];

const Appointments = () => {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isFormOpen, setIsFormOpen] = useState(false);

  const appointmentDates = mockAppointments.map(apt => new Date(apt.date));

  return (
    <DashboardLayout title="Appointments" subtitle="Manage patient appointments">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
            <Button
              variant={view === 'calendar' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('calendar')}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              Calendar
            </Button>
          </div>
          
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Appointment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Book New Appointment</DialogTitle>
              </DialogHeader>
              <AppointmentForm onSuccess={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Content */}
        {view === 'list' ? (
          <DataTable
            data={mockAppointments}
            columns={columns}
            searchKey="patientName"
            searchPlaceholder="Search by patient name..."
            filters={[
              {
                key: 'status',
                label: 'Status',
                options: [
                  { value: 'scheduled', label: 'Scheduled' },
                  { value: 'completed', label: 'Completed' },
                  { value: 'cancelled', label: 'Cancelled' },
                  { value: 'no-show', label: 'No Show' },
                ],
              },
              {
                key: 'type',
                label: 'Type',
                options: [
                  { value: 'consultation', label: 'Consultation' },
                  { value: 'follow-up', label: 'Follow-up' },
                  { value: 'emergency', label: 'Emergency' },
                  { value: 'routine-checkup', label: 'Checkup' },
                  { value: 'gynae', label: 'Gynae' },
                ],
              },
            ]}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="card-medical lg:col-span-1">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="pointer-events-auto"
                modifiers={{
                  hasAppointment: appointmentDates,
                }}
                modifiersStyles={{
                  hasAppointment: {
                    backgroundColor: 'hsl(var(--primary) / 0.1)',
                    color: 'hsl(var(--primary))',
                    fontWeight: '600',
                  },
                }}
              />
            </div>
            <div className="card-medical lg:col-span-2">
              <h3 className="font-display font-semibold text-lg mb-4">
                {selectedDate ? format(selectedDate, 'MMMM dd, yyyy') : 'Select a date'}
              </h3>
              <div className="space-y-3">
                {mockAppointments
                  .filter(apt => selectedDate && apt.date === format(selectedDate, 'yyyy-MM-dd'))
                  .map((apt) => (
                    <div key={apt.id} className="p-4 rounded-xl bg-muted/30 flex items-center justify-between">
                      <div>
                        <p className="font-medium">{apt.patientName}</p>
                        <p className="text-sm text-muted-foreground">{apt.time} - {typeLabels[apt.type]}</p>
                      </div>
                      <span className={cn(statusStyles[apt.status])}>
                        {apt.status}
                      </span>
                    </div>
                  ))}
                {selectedDate && mockAppointments.filter(apt => apt.date === format(selectedDate, 'yyyy-MM-dd')).length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No appointments for this date</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Appointments;
