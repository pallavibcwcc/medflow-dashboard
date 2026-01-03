import { mockPatients } from '@/data/mockData';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecentPatients() {
  const recentPatients = mockPatients.slice(0, 5);

  return (
    <div className="card-medical animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-display font-semibold text-lg text-foreground">Recent Patients</h3>
          <p className="text-sm text-muted-foreground">Newly registered</p>
        </div>
        <Button variant="outline" size="sm">View All</Button>
      </div>

      <div className="space-y-3">
        {recentPatients.map((patient, index) => (
          <div
            key={patient.id}
            className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors cursor-pointer group"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-accent text-accent-foreground text-sm font-medium">
                  {patient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground text-sm">{patient.name}</p>
                <p className="text-xs text-muted-foreground">{patient.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(
                'px-2 py-0.5 rounded text-xs font-medium',
                patient.status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
              )}>
                {patient.status}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
