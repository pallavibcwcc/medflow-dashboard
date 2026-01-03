import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentAppointments } from '@/components/dashboard/RecentAppointments';
import { RecentPatients } from '@/components/dashboard/RecentPatients';
import { dashboardStats } from '@/data/mockData';
import { Users, CalendarCheck, FileText, Activity } from 'lucide-react';

const Dashboard = () => {
  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, Dr. Foster">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Patients"
          value={dashboardStats.totalPatients}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Today's Appointments"
          value={dashboardStats.todayAppointments}
          change="3 pending confirmation"
          changeType="neutral"
          icon={CalendarCheck}
        />
        <StatCard
          title="Pending Reports"
          value={dashboardStats.pendingReports}
          change="-5 from yesterday"
          changeType="positive"
          icon={FileText}
        />
        <StatCard
          title="Completed Visits"
          value={dashboardStats.completedVisits}
          change="This month"
          changeType="neutral"
          icon={Activity}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentAppointments />
        </div>
        <div>
          <RecentPatients />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
