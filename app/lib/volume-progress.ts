/**
 * Utility functions for calculating and displaying volume progress
 * based on reading volume stages rather than fixed totals
 */

export interface VolumeProgressInfo {
  percentage: number;
  label: string;
  color: string;
  volumeText: string;
  stage: string;
}

export interface VolumeStage {
  max: number;
  label: string;
  color: string;
  stage: string;
}

const VOLUME_STAGES: VolumeStage[] = [
  { max: 5, label: 'Quick Reader', color: 'bg-green-500', stage: 'beginner' },
  {
    max: 15,
    label: 'Dedicated Reader',
    color: 'bg-blue-500',
    stage: 'intermediate',
  },
  {
    max: 30,
    label: 'Manga Enthusiast',
    color: 'bg-yellow-500',
    stage: 'advanced',
  },
  { max: 50, label: 'Manga Expert', color: 'bg-orange-500', stage: 'expert' },
  {
    max: Infinity,
    label: 'Manga Master',
    color: 'bg-red-500',
    stage: 'master',
  },
];

/**
 * Calculate reading progress information based on volume and chapter progress
 * Converts chapter progress to equivalent volumes (10 chapters = 1 volume)
 */
export function getReadingProgress(
  progressVolume: number | null,
  progressChapter: number | null,
): VolumeProgressInfo {
  // Calculate equivalent volumes from chapters (10 chapters = 1 volume)
  const volumeFromChapters = progressChapter
    ? Math.floor(progressChapter / 10)
    : 0;

  // Use the higher value between actual volumes and calculated volumes from chapters
  const effectiveVolumes = Math.max(progressVolume || 0, volumeFromChapters);

  if (effectiveVolumes <= 0 && !progressChapter) {
    return {
      percentage: 0,
      label: 'Not Started',
      color: 'bg-gray-300',
      volumeText: 'Not started',
      stage: 'none',
    };
  }

  // Find the appropriate stage for this volume count
  const currentStage =
    VOLUME_STAGES.find((stage) => effectiveVolumes <= stage.max) ||
    VOLUME_STAGES[VOLUME_STAGES.length - 1];
  const currentStageIndex = VOLUME_STAGES.indexOf(currentStage);
  const prevStageMax =
    currentStageIndex > 0 ? VOLUME_STAGES[currentStageIndex - 1].max : 0;

  // Calculate percentage within the current stage
  let percentage: number;
  if (currentStage.max === Infinity) {
    // For the highest stage, show 100% once you reach 50+ volumes
    percentage = 100;
  } else {
    const stageRange = currentStage.max - prevStageMax;
    const progressInStage = effectiveVolumes - prevStageMax;
    percentage = Math.min((progressInStage / stageRange) * 100, 100);
  }

  // Format progress text based on what data is available
  let volumeText: string;
  if (progressVolume && progressChapter) {
    volumeText = `Vol. ${progressVolume}, Ch. ${progressChapter}`;
  } else if (progressVolume) {
    volumeText =
      progressVolume === 1 ? '1 volume' : `${progressVolume} volumes`;
  } else if (progressChapter) {
    volumeText = `Chapter ${progressChapter}`;
  } else {
    volumeText = 'Not started';
  }

  return {
    percentage,
    label: currentStage.label,
    color: currentStage.color,
    volumeText,
    stage: currentStage.stage,
  };
}

/**
 * Calculate volume progress information based on current reading progress
 * @deprecated Use getReadingProgress instead for better chapter support
 */
export function getVolumeProgress(
  progressVolume: number | null,
): VolumeProgressInfo {
  return getReadingProgress(progressVolume, null);
}

/**
 * Get reading achievement based on volume and chapter progress
 */
export function getReadingAchievement(
  progressVolume: number | null,
  progressChapter: number | null,
): {
  text: string;
  emoji: string;
} {
  // Calculate equivalent volumes from chapters (10 chapters = 1 volume)
  const volumeFromChapters = progressChapter
    ? Math.floor(progressChapter / 10)
    : 0;
  const effectiveVolumes = Math.max(progressVolume || 0, volumeFromChapters);

  if (effectiveVolumes <= 0 && !progressChapter) {
    return { text: 'Start Reading', emoji: '📖' };
  }

  const achievementEmojis = ['✨', '📚', '🎓', '👑', '🏆'];
  const currentStage =
    VOLUME_STAGES.find((stage) => effectiveVolumes <= stage.max) ||
    VOLUME_STAGES[VOLUME_STAGES.length - 1];
  const stageIndex = VOLUME_STAGES.indexOf(currentStage);

  return {
    text: currentStage.label,
    emoji: achievementEmojis[stageIndex] || '🏆',
  };
}
