import {
  AlertTriangle,
  BarChart3,
  LayoutDashboard,
  Radio,
  Users,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'layout-dashboard': LayoutDashboard,
  'alert-triangle': AlertTriangle,
  radio: Radio,
  users: Users,
  'bar-chart-3': BarChart3,
};

export function getNavIcon(name: string): LucideIcon {
  return iconMap[name] ?? Radio;
}
