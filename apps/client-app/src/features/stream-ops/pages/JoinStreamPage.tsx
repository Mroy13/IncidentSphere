import { useLocation } from 'react-router-dom';
import { Card } from '@/shared/components/ui/Card';
import { JoinStreamForm } from '@/features/stream-ops/components/JoinStreamForm';

export function JoinStreamPage() {
  const { search } = useLocation();
  const initialCode =
    new URLSearchParams(search).get('code')?.replace(/\s/g, '').toUpperCase() ?? '';

  return (
    <div className="mx-auto max-w-md">
      <Card
        title="Join live stream"
        description="Enter the stream code shared by your incident commander"
      >
        <JoinStreamForm initialCode={initialCode} />
      </Card>
    </div>
  );
}
