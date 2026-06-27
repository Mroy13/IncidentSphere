import { Card } from '@/shared/components/ui/Card';
import { CreateStreamForm } from '@/features/stream-ops/components/CreateStreamForm';

export function CreateStreamPage() {
  return (
    <div className="mx-auto max-w-xl">
      <Card
        title="Create incident stream"
        description="Link a live or scheduled video feed to an active incident"
        variant="highlight"
      >
        <CreateStreamForm />
      </Card>
    </div>
  );
}
