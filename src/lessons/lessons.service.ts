import { Injectable, NotFoundException } from '@nestjs/common';

import { LessonsRepository } from './lessons.repository.js';

@Injectable()
export class LessonsService {
  constructor(private readonly repository: LessonsRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    const lesson = await this.repository.findById(id);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    return lesson;
  }

  findByUnitId(unitId: number) {
    return this.repository.findByUnitId(unitId);
  }

  async getLearningData(id: number) {
    const lesson = await this.repository.findById(id);

    if (!lesson) {
      throw new NotFoundException('Lesson not found');
    }

    const links = await this.repository.findVocabularyLinks(id);

    const sortedLinks = [...links].sort(
      (a, b) => (a.position ?? 0) - (b.position ?? 0),
    );

    const vocabulary = [];

    for (const link of sortedLinks) {
      const word = await this.repository.findVocabulary(link.vocabularyId);

      if (!word) {
        continue;
      }

      const translations = await this.repository.findVocabularyTranslations(
        link.vocabularyId,
      );

      vocabulary.push({
        id: link.id,
        position: link.position,
        isRequired: link.isRequired,

        vocabulary: {
          id: word.id,
          languageId: word.languageId,
          word: word.word,
          normalizedWord: word.normalizedWord,
          pronunciation: word.pronunciation,
          partOfSpeech: word.partOfSpeech,
          definition: word.definition,
          audioUrl: word.audioUrl,
          imageUrl: word.imageUrl,
        },

        translations: translations.map((translation) => ({
          id: translation.id,
          languageId: translation.languageId,
          translation: translation.translation,
          normalizedTranslation: translation.normalizedTranslation,
        })),
      });
    }

    const exercises = await this.repository.findExercises(id);

    const exerciseData = [];

    for (const exercise of exercises) {
      if (!exercise.isActive) {
        continue;
      }

      const options = await this.repository.findExerciseOptions(exercise.id);

      exerciseData.push({
        id: exercise.id,
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
      });
    }

    exerciseData.sort((a, b) => a.number - b.number);

    return {
      lesson,
      vocabulary,
      exercises: exerciseData,
    };
  }
}
