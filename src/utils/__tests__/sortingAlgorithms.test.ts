import {
  bubbleSort,
  insertionSort,
  mergeSort,
  quickSort,
} from '../sortingAlgorithms';
import type { Skill } from '../sortingAlgorithms';

describe('Sorting Algorithms', () => {
  const testCases: Skill[][] = [
    [
      { name: 'JavaScript', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Python', level: 95 },
      { name: 'Java', level: 80 },
    ],
    [
      { name: 'React', level: 95 },
      { name: 'Vue', level: 85 },
      { name: 'Angular', level: 75 },
    ],
    [
      { name: 'Node.js', level: 90 },
      { name: 'Express', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 85 },
    ],
  ];

  const verifySorting = (result: { sorted: Skill[]; steps: Skill[][] }) => {
    // Check if the array is sorted in descending order
    for (let i = 0; i < result.sorted.length - 1; i++) {
      expect(result.sorted[i].level).toBeGreaterThanOrEqual(
        result.sorted[i + 1].level
      );
    }

    // If there are steps, verify the last step matches the sorted array
    if (result.steps.length > 0) {
      expect(result.steps[result.steps.length - 1]).toEqual(result.sorted);
    } else {
      // If no steps, the array was already sorted
      expect(result.sorted).toBeDefined();
    }
  };

  describe('bubbleSort', () => {
    testCases.forEach((testCase, index) => {
      test(`should correctly sort test case ${index + 1}`, () => {
        const result = bubbleSort(testCase);
        verifySorting(result);
      });
    });
  });

  describe('insertionSort', () => {
    testCases.forEach((testCase, index) => {
      test(`should correctly sort test case ${index + 1}`, () => {
        const result = insertionSort(testCase);
        verifySorting(result);
      });
    });
  });

  describe('mergeSort', () => {
    testCases.forEach((testCase, index) => {
      test(`should correctly sort test case ${index + 1}`, () => {
        const result = mergeSort(testCase);
        verifySorting(result);
      });
    });
  });

  describe('quickSort', () => {
    testCases.forEach((testCase, index) => {
      test(`should correctly sort test case ${index + 1}`, () => {
        const result = quickSort(testCase);
        verifySorting(result);
      });
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty array', () => {
      const emptyArray: Skill[] = [];
      const result = bubbleSort(emptyArray);
      expect(result.sorted).toEqual([]);
      expect(result.steps).toEqual([]);
    });

    test('should handle single element array', () => {
      const singleElement: Skill[] = [{ name: 'Test', level: 100 }];
      const result = bubbleSort(singleElement);
      expect(result.sorted).toEqual(singleElement);
      expect(result.steps).toEqual([]);
    });

    test('should handle array with duplicate levels', () => {
      const duplicates: Skill[] = [
        { name: 'A', level: 90 },
        { name: 'B', level: 90 },
        { name: 'C', level: 85 },
      ];
      const result = bubbleSort(duplicates);
      verifySorting(result);
    });
  });
});
