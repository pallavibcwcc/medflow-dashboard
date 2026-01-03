import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { mockDoctors } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Plus, Phone, Mail, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const statusStyles: Record<string, string> = {
  available: 'bg-success/10 text-success',
  busy: 'bg-warning/10 text-warning',
  'off-duty': 'bg-muted text-muted-foreground',
};

const Doctors = () => {
  return (
    <DashboardLayout title="Doctors" subtitle="Medical staff directory">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground">{mockDoctors.length} doctors registered</p>
          </div>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDoctors.map((doctor, index) => (
            <div
              key={doctor.id}
              className="card-medical hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                      <p className="text-sm text-primary">{doctor.specialization}</p>
                    </div>
                    <span className={cn('px-2.5 py-1 rounded-full text-xs font-medium capitalize', statusStyles[doctor.status])}>
                      {doctor.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <p className="text-sm text-muted-foreground">{doctor.department}</p>
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground truncate">{doctor.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{doctor.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {doctor.schedule.map((day) => (
                      <span key={day} className="px-2 py-0.5 bg-accent rounded text-xs text-accent-foreground">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                <Button size="sm" className="flex-1">Schedule</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Doctors;
