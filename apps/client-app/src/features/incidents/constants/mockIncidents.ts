/** Dev-only incident list — replace with incidents API when module ships */

export interface IncidentOption {
  id: string;
  title: string;
}

export const MOCK_INCIDENTS: IncidentOption[] = [
  {
    id: '55555555-5555-5555-5555-555555555555',
    title: 'Site Inspection', // Construction
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    title: 'Ransomware Attack', // Cybersecurity
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    title: 'Factory Fire',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    title: 'Chemical Leak',
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    title: 'Construction Site Accident', // Construction
  },
];
export function getIncidentById(id: string): IncidentOption | undefined {
  return MOCK_INCIDENTS.find((incident) => incident.id === id);
}
