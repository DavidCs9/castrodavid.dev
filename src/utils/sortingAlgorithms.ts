export interface Skill {
  name: string;
  level: number;
}

export type OnStepCallback = (step: Skill[]) => void;

export const bubbleSort = (array: Skill[], onStep?: OnStepCallback) => {
  const arr = [...array];
  let swapped: boolean;
  const steps: Skill[][] = [];

  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      // Orden descendente por nivel
      if (arr[i].level < arr[i + 1].level) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        const snapshot = [...arr];
        steps.push(snapshot);
        if (onStep) onStep(snapshot);
      }
    }
  } while (swapped);

  return { sorted: arr, steps };
};

export const selectionSort = (array: Skill[], onStep?: OnStepCallback) => {
  const arr = [...array];
  const steps: Skill[][] = [];

  for (let i = 0; i < arr.length; i++) {
    let maxIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j].level > arr[maxIdx].level) {
        maxIdx = j;
      }
    }
    if (maxIdx !== i) {
      [arr[i], arr[maxIdx]] = [arr[maxIdx], arr[i]];
      const snapshot = [...arr];
      steps.push(snapshot);
      if (onStep) onStep(snapshot);
    }
  }

  return { sorted: arr, steps };
};
