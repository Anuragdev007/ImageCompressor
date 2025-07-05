import { z } from "zod";

export const compressionSettingsSchema = z.object({
  quality: z.number().min(10).max(100).default(80),
  resizeWidth: z.number().optional(),
  outputFormat: z.enum(["jpeg", "webp"]).default("jpeg"),
});

export const qualityMetricsSchema = z.object({
  psnr: z.number().optional(),
  ssim: z.number().optional(),
  fileReduction: z.number(),
  qualityScore: z.number(),
  recommendation: z.enum(["excellent", "good", "acceptable", "poor"]),
});

export const uploadedFileSchema = z.object({
  id: z.string(),
  name: z.string(),
  originalSize: z.number(),
  compressedSize: z.number().optional(),
  quality: z.number(),
  progress: z.number().min(0).max(100).default(0),
  status: z.enum(["pending", "processing", "complete", "error"]).default("pending"),
  originalBlob: z.any(), // File blob
  compressedBlob: z.any().optional(), // Compressed blob
  previewUrl: z.string(),
  error: z.string().optional(),
  qualityMetrics: qualityMetricsSchema.optional(),
});

export const sessionStatsSchema = z.object({
  totalFiles: z.number().default(0),
  processedFiles: z.number().default(0),
  totalSaved: z.number().default(0), // in bytes
  averageReduction: z.number().default(0), // percentage
});

export type CompressionSettings = z.infer<typeof compressionSettingsSchema>;
export type QualityMetrics = z.infer<typeof qualityMetricsSchema>;
export type UploadedFile = z.infer<typeof uploadedFileSchema>;
export type SessionStats = z.infer<typeof sessionStatsSchema>;
