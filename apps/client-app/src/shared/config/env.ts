export const env = {
  streamApiUrl: import.meta.env.VITE_STREAM_API_URL ?? '',
  // liveKitUrlOverride: import.meta.env.VITE_LIVEKIT_URL ?? '',
} as const;

export function getApiBaseUrl(): string {
  return env.streamApiUrl.replace(/\/$/, '');
}

export function resolveLiveKitUrl(rtcUrl?: string | null): string {
  if (!rtcUrl) {
    throw new Error('LiveKit URL missing from API response');
  }

  const url = new URL(rtcUrl.trim());

  if (url.protocol !== 'ws:' && url.protocol !== 'wss:') {
    throw new Error(`Invalid LiveKit protocol: ${url.protocol}`);
  }

  return url.toString();
}