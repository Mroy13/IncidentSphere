export type NavItemStatus = 'active' | 'coming-soon' | 'disabled';

export interface NavItem {
  id: string;
  label: string;
  path: string;
  description: string;
  status: NavItemStatus;
  icon: string;
}

export const primaryNav: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Command Center',
    path: '/',
    description: 'Operational overview',
    status: 'coming-soon',
    icon: 'layout-dashboard',
  },
  {
    id: 'incidents',
    label: 'Incidents',
    path: '/incidents',
    description: 'Case management',
    status: 'coming-soon',
    icon: 'alert-triangle',
  },
  {
    id: 'stream-ops',
    label: 'Stream Ops',
    path: '/stream-ops',
    description: 'Live video operations',
    status: 'active',
    icon: 'radio',
  },
  {
    id: 'teams',
    label: 'Teams',
    path: '/teams',
    description: 'Responder roster',
    status: 'coming-soon',
    icon: 'users',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    description: 'Post-incident insights',
    status: 'coming-soon',
    icon: 'bar-chart-3',
  },
];

export const streamOpsNav = [
  { label: 'Overview', path: '/stream-ops' },
  { label: 'Create Stream', path: '/stream-ops/create' },
  { label: 'Join Stream', path: '/stream-ops/join' },
] as const;
