/**
 * Sora API Integration
 * Preserves existing Sora API functionality for video generation.
 */

const SORA_API_KEY = process.env.SORA_API_KEY;
const SORA_API_URL = process.env.SORA_API_URL ?? "https://api.openai.com/v1";

export interface SoraVideoRequest {
  prompt: string;
  duration?: number;
  resolution?: "480p" | "720p" | "1080p";
  style?: string;
}

export interface SoraVideoResponse {
  id: string;
  status: "pending" | "processing" | "completed" | "failed";
  videoUrl?: string;
  thumbnailUrl?: string;
  prompt: string;
  createdAt: string;
}

export async function generateSoraVideo(
  request: SoraVideoRequest
): Promise<SoraVideoResponse> {
  if (!SORA_API_KEY) {
    throw new Error("SORA_API_KEY environment variable is not set");
  }

  const response = await fetch(`${SORA_API_URL}/videos/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SORA_API_KEY}`,
    },
    body: JSON.stringify({
      model: "sora",
      prompt: request.prompt,
      n: 1,
      size: request.resolution === "480p" ? "480p" : request.resolution === "1080p" ? "1080p" : "720p",
      duration: request.duration ?? 5,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Sora API error: ${response.status} — ${error}`);
  }

  const data = await response.json() as {
    id: string;
    status: string;
    data?: Array<{ url: string }>;
  };

  return {
    id: data.id,
    status: (data.status as SoraVideoResponse["status"]) ?? "pending",
    videoUrl: data.data?.[0]?.url,
    prompt: request.prompt,
    createdAt: new Date().toISOString(),
  };
}

export async function getSoraVideoStatus(
  generationId: string
): Promise<SoraVideoResponse> {
  if (!SORA_API_KEY) {
    throw new Error("SORA_API_KEY environment variable is not set");
  }

  const response = await fetch(`${SORA_API_URL}/videos/generations/${generationId}`, {
    headers: {
      Authorization: `Bearer ${SORA_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Sora status check error: ${response.status}`);
  }

  const data = await response.json() as {
    id: string;
    status: string;
    prompt: string;
    created_at: string;
    data?: Array<{ url: string; thumbnail_url?: string }>;
  };

  return {
    id: data.id,
    status: (data.status as SoraVideoResponse["status"]) ?? "pending",
    videoUrl: data.data?.[0]?.url,
    thumbnailUrl: data.data?.[0]?.thumbnail_url,
    prompt: data.prompt,
    createdAt: data.created_at,
  };
}
