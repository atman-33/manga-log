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
 * Calculate volume progress information based on current reading progress
 */
export function getVolumeProgress(
  progressVolume: number | null,
): VolumeProgressInfo {
  if (!progressVolume || progressVolume <= 0) {
    return {
      percentage: 0,
      label: 'Not Started',
      color: 'bg-gray-300',
      volumeText: '0 volumes',
      stage: 'none',
    };
  }

  // Find the appropriate stage for this volume count
  const currentStage =
    VOLUME_STAGES.find((stage) => progressVolume <= stage.max) ||
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
    const progressInStage = progressVolume - prevStageMax;
    percentage = Math.min((progressInStage / stageRange) * 100, 100);
  }

  // Format volume text
  const volumeText =
    progressVolume === 1
      ? '1 volume'
      : progressVolume > 50
        ? `${progressVolume} volumes (50+)`
        : `${progressVolume} volumes`;

  return {
    percentage,
    label: currentStage.label,
    color: currentStage.color,
    volumeText,
    stage: currentStage.stage,
  };
}

/**
 * Get reading achievement based on volume count
 */
export function getReadingAchievement(progressVolume: number | null): {
  text: string;
  emoji: string;
} {
  if (!progressVolume || progressVolume <= 0) {
    return { text: 'Start Reading', emoji: '📖' };
  }

  const achievementEmojis = ['✨', '📚', '🎓', '👑', '🏆'];
  const currentStage =
    VOLUME_STAGES.find((stage) => progressVolume <= stage.max) ||
    VOLUME_STAGES[VOLUME_STAGES.length - 1];
  const stageIndex = VOLUME_STAGES.indexOf(currentStage);

  return {
    text: currentStage.label,
    emoji: achievementEmojis[stageIndex] || '🏆',
  };
}
