import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateStreamMutation } from '@/features/stream-ops/api/streamApi';
import { registerStreamSession } from '@/features/stream-ops/store/streamOpsSlice';
import { MOCK_INCIDENTS, getIncidentById } from '@/features/incidents/constants/mockIncidents';
import { useAppDispatch } from '@/app/hooks';
import { Alert } from '@/shared/components/ui/Alert';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Select } from '@/shared/components/ui/Select';

interface FormErrors {
  incidentId?: string;
  title?: string;
  scheduledAt?: string;
  general?: string;
}

export function CreateStreamForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createStream, { isLoading }] = useCreateStreamMutation();

  const [incidentId, setIncidentId] = useState(MOCK_INCIDENTS[0]?.id ?? '');
  const [title, setTitle] = useState('');
  const [isManual, setIsManual] = useState(true);
  const [scheduledAt, setScheduledAt] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (!incidentId) {
      next.incidentId = 'Select an incident';
    }
    if (!title.trim()) {
      next.title = 'Title is required';
    } else if (title.length > 200) {
      next.title = 'Title must be 200 characters or fewer';
    }
    if (!isManual && !scheduledAt) {
      next.scheduledAt = 'Schedule time is required for scheduled streams';
    } else if (!isManual && scheduledAt) {
      const scheduled = new Date(scheduledAt);
      if (scheduled <= new Date()) {
        next.scheduledAt = 'Scheduled time must be in the future';
      }
    }

    return next;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const incident = getIncidentById(incidentId);

    try {
      const result = await createStream({
        incidentId,
        title: title.trim(),
        isManual,
        scheduledAt: isManual ? null : new Date(scheduledAt).toISOString(),
      }).unwrap();

      dispatch(
        registerStreamSession({
          streamId: result.streamId,
          streamCode: result.streamCode,
          title: title.trim(),
          incidentId,
          incidentTitle: incident?.title ?? 'Unknown incident',
          status: isManual ? 'active' : 'scheduled',
          isManual,
          scheduledAt: isManual ? null : new Date(scheduledAt).toISOString(),
          createdAt: new Date().toISOString(),
        }),
      );

      navigate(`/stream-ops/room/${result.streamId}`, {
        state: { streamCode: result.streamCode, justCreated: true },
      });
    } catch (error) {
      const message =
        error && typeof error === 'object' && 'data' in error
          ? String((error as { data?: { message?: string } }).data?.message ?? 'Failed to create stream')
          : 'Failed to create stream. Ensure stream-service is running.';
      setErrors({ general: message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.general && <Alert variant="error" message={errors.general} />}

      <Select
        label="Incident"
        name="incidentId"
        value={incidentId}
        onChange={(e) => setIncidentId(e.target.value)}
        error={errors.incidentId}
        hint="Linked incident from command registry (mock data in dev)"
      >
        {MOCK_INCIDENTS.map((incident) => (
          <option key={incident.id} value={incident.id}>
            {incident.title}
          </option>
        ))}
      </Select>

      <Input
        label="Stream title"
        name="title"
        placeholder="e.g. North gate live feed"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
        maxLength={200}
      />

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-slate-300">Start mode</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <label
            className={`cursor-pointer rounded-lg border p-4 transition-colors ${
              isManual
                ? 'border-accent-500/40 bg-accent-500/10'
                : 'border-border-subtle bg-surface-850 hover:border-border-strong'
            }`}
          >
            <input
              type="radio"
              name="startMode"
              className="sr-only"
              checked={isManual}
              onChange={() => setIsManual(true)}
            />
            <p className="font-semibold text-white">Go live now</p>
            <p className="mt-1 text-xs text-slate-400">Start streaming immediately</p>
          </label>
          <label
            className={`cursor-pointer rounded-lg border p-4 transition-colors ${
              !isManual
                ? 'border-accent-500/40 bg-accent-500/10'
                : 'border-border-subtle bg-surface-850 hover:border-border-strong'
            }`}
          >
            <input
              type="radio"
              name="startMode"
              className="sr-only"
              checked={!isManual}
              onChange={() => setIsManual(false)}
            />
            <p className="font-semibold text-white">Schedule</p>
            <p className="mt-1 text-xs text-slate-400">Set a future start time</p>
          </label>
        </div>
      </fieldset>

      {!isManual && (
        <Input
          label="Scheduled start"
          name="scheduledAt"
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          error={errors.scheduledAt}
        />
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={() => navigate('/stream-ops')}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {isManual ? 'Create & go live' : 'Schedule stream'}
        </Button>
      </div>
    </form>
  );
}
