export const env = {
  streamApiUrl: import.meta.env.VITE_STREAM_API_URL ?? '',
  liveKitUrlOverride: import.meta.env.VITE_LIVEKIT_URL ?? '',
} as const;

export function getApiBaseUrl(): string {
  return env.streamApiUrl.replace(/\/$/, '');
}

export function resolveLiveKitUrl(apiUrl: string): string {
  if (env.liveKitUrlOverride) {
    return env.liveKitUrlOverride;
  }

  if (apiUrl.includes('YOUR_EC2_IP') || !apiUrl.startsWith('ws')) {
    return env.liveKitUrlOverride || 'ws://localhost:7880';
  }

  return apiUrl;
}
