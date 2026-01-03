import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  FileText,
  ClipboardList,
  Baby,
  Settings,
  LogOut,
  Stethoscope,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Appointments', href: '/appointments', icon: CalendarDays },
  { name: 'Patients', href: '/patients', icon: Users },
  { name: 'Medical Records', href: '/records', icon: ClipboardList },
  { name: 'Gynae Records', href: '/gynae', icon: Baby },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Doctors', href: '/doctors', icon: Stethoscope },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out',
          'bg-sidebar text-sidebar-foreground',
          'lg:translate-x-0',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{ background: 'var(--gradient-sidebar)' }}
      >
        {/* Logo */}
        <div className={cn(
          'flex items-center h-16 px-4 border-b border-sidebar-border',
          isCollapsed ? 'justify-center' : 'gap-3'
        )}>
          <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-sidebar-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-display font-bold text-lg text-sidebar-foreground">MediCare</h1>
              <p className="text-xs text-sidebar-foreground/60">Medical Portal</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                  'hover:bg-sidebar-accent',
                  isActive
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground/70 hover:text-sidebar-foreground',
                  isCollapsed && 'justify-center px-2'
                )}
              >
                <item.icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-current')} />
                {!isCollapsed && <span className="font-medium text-sm">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
          >
            <Menu className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium text-sm">Collapse</span>}
          </button>
          <button className={cn(
            'flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200 mt-1',
            isCollapsed && 'justify-center px-2'
          )}>
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Spacer for main content */}
      <div className={cn(
        'hidden lg:block flex-shrink-0 transition-all duration-300',
        isCollapsed ? 'w-20' : 'w-64'
      )} />
    </>
  );
}
