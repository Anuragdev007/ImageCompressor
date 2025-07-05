export interface QualityMetrics {
  psnr?: number; // Peak Signal-to-Noise Ratio
  ssim?: number; // Structural Similarity Index
  fileReduction: number; // Percentage reduction in file size
  qualityScore: number; // Overall quality score (1-100)
  recommendation: 'excellent' | 'good' | 'acceptable' | 'poor';
}

export function calculateQualityMetrics(
  originalSize: number,
  compressedSize: number,
  quality: number
): QualityMetrics {
  const fileReduction = Math.round(((originalSize - compressedSize) / originalSize) * 100);
  
  // Estimate quality score based on compression settings and file size reduction
  let qualityScore = quality;
  
  // Adjust based on compression efficiency
  if (fileReduction > 70) {
    qualityScore = Math.max(qualityScore - 20, 10);
  } else if (fileReduction > 50) {
    qualityScore = Math.max(qualityScore - 10, 20);
  } else if (fileReduction < 20) {
    qualityScore = Math.min(qualityScore + 5, 100);
  }
  
  // Determine recommendation
  let recommendation: QualityMetrics['recommendation'];
  if (qualityScore >= 85 && fileReduction >= 20) {
    recommendation = 'excellent';
  } else if (qualityScore >= 70 && fileReduction >= 15) {
    recommendation = 'good';
  } else if (qualityScore >= 50 && fileReduction >= 10) {
    recommendation = 'acceptable';
  } else {
    recommendation = 'poor';
  }
  
  return {
    fileReduction,
    qualityScore: Math.round(qualityScore),
    recommendation
  };
}

export function getRecommendationText(recommendation: QualityMetrics['recommendation']): string {
  switch (recommendation) {
    case 'excellent':
      return 'Excellent balance of quality and file size';
    case 'good':
      return 'Good compression with minimal quality loss';
    case 'acceptable':
      return 'Acceptable compression, some quality loss';
    case 'poor':
      return 'Poor quality or insufficient compression';
  }
}

export function getRecommendationColor(recommendation: QualityMetrics['recommendation']): string {
  switch (recommendation) {
    case 'excellent':
      return 'text-green-600 bg-green-50';
    case 'good':
      return 'text-blue-600 bg-blue-50';
    case 'acceptable':
      return 'text-yellow-600 bg-yellow-50';
    case 'poor':
      return 'text-red-600 bg-red-50';
  }
}