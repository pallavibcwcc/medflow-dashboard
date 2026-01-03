import { mockAppointments } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusStyles = {
  scheduled: 'badge-info',
  completed: 'badge-success',
  cancelled: 'badge-destructive',
  'no-show': 'badge-warning',
};

const typeLabels = {
  consultation: 'Consultation',
  'follow-up': 'Follow-up',
  emergency: 'Emergency',
  'routine-checkup': 'Checkup',
  gynae: 'Gynae',
};

export function RecentAppointments() {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = mockAppointments.filter(apt => apt.date >= today).slice(0, 5);

  return (
    <div className="card-medical animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Upcoming Appointments</h3>
          <p className="text-sm text-muted-foreground">Today's schedule</p>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="space-y-4">
        {todayAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{appointment.patientName}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">{appointment.time}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{typeLabels[appointment.type]}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={cn(statusStyles[appointment.status])}>
                {appointment.status}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {todayAppointments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No upcoming appointments
          </div>
        )}
      </div>
    </div>
  );
}
