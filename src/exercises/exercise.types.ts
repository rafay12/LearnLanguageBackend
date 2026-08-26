export const EXERCISE_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRANSLATION: 'translation',
  FILL_BLANK: 'fill_blank',
  TRUE_FALSE: 'true_false',
  MATCHING: 'matching',
} as const;

export type ExerciseType = (typeof EXERCISE_TYPES)[keyof typeof EXERCISE_TYPES];
