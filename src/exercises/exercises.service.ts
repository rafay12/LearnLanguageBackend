import { Injectable, NotFoundException } from '@nestjs/common';

import { ExercisesRepository } from './exercises.repository.js';
import { EXERCISE_TYPES } from './exercise.types.js';

@Injectable()
export class ExercisesService {
  constructor(private readonly repository: ExercisesRepository) {}

  async findAll() {
    const exercises = await this.repository.findAll();

    return exercises
      .filter((exercise) => exercise.isActive)
      .map((exercise) => ({
        id: exercise.id,
        lessonId: exercise.lessonId,
        number: exercise.number,
        type: exercise.type,
        question: exercise.question,
        explanation: exercise.explanation,
        points: exercise.points,
      }));
  }

  async findByLessonId(lessonId: number) {
    const exercises = await this.repository.findByLessonId(lessonId);

    return Promise.all(
      exercises
        .filter((exercise) => exercise.isActive)
        .sort((a, b) => a.number - b.number)
        .map(async (exercise) => {
          const options = await this.repository.findOptions(exercise.id);

          return {
            id: exercise.id,
            lessonId: exercise.lessonId,
            number: exercise.number,
            type: exercise.type,
            question: exercise.question,
            explanation: exercise.explanation,
            points: exercise.points,

            options: options
              .sort((a, b) => a.number - b.number)
              .map((option) => ({
                id: option.id,
                number: option.number,
                value: option.value,
                label: option.label,
              })),
          };
        }),
    );
  }

  async findOne(id: number) {
    const exercise = await this.repository.findById(id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    const options = await this.repository.findOptions(id);

    return {
      id: exercise.id,
      lessonId: exercise.lessonId,
      number: exercise.number,
      type: exercise.type,
      question: exercise.question,
      explanation: exercise.explanation,
      points: exercise.points,

      options: options
        .sort((a, b) => a.number - b.number)
        .map((option) => ({
          id: option.id,
          number: option.number,
          value: option.value,
          label: option.label,
        })),
    };
  }

  async getForSubmission(id: number) {
    const exercise = await this.repository.findById(id);

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    if (!exercise.isActive) {
      throw new NotFoundException('Exercise is not active');
    }

    const options = await this.repository.findOptions(id);

    return {
      exercise,
      options,
    };
  }

  normalizeAnswer(value: string): string {
    return value
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ');
  }

  evaluateAnswer(exercise: any, options: any[], submittedAnswer: string) {
    const answer = this.normalizeAnswer(submittedAnswer);

    let correct = false;

    switch (exercise.type) {
      case EXERCISE_TYPES.MULTIPLE_CHOICE: {
        const selectedOption = options.find(
          (option) =>
            this.normalizeAnswer(String(option.value)) === answer ||
            String(option.id) === submittedAnswer.trim(),
        );

        correct = Boolean(selectedOption?.isCorrect);

        break;
      }

      case EXERCISE_TYPES.TRANSLATION:
      case EXERCISE_TYPES.FILL_BLANK:
      case EXERCISE_TYPES.TRUE_FALSE:
      case EXERCISE_TYPES.MATCHING: {
        if (typeof exercise.answer === 'string') {
          const acceptedAnswers = exercise.answer
            .split('|')
            .map((value: string) => this.normalizeAnswer(value));

          correct = acceptedAnswers.includes(answer);
        }

        break;
      }

      default: {
        if (typeof exercise.answer === 'string') {
          correct = this.normalizeAnswer(exercise.answer) === answer;
        }

        break;
      }
    }

    const maxScore = Number(exercise.points ?? 0);

    const score = correct ? maxScore : 0;

    return {
      correct,
      score,
      maxScore,
    };
  }
}
