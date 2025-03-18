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

export const insertionSort = (array: Skill[], onStep?: OnStepCallback) => {
  const arr = [...array];
  const steps: Skill[][] = [];

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j].level < current.level) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
    const snapshot = [...arr];
    steps.push(snapshot);
    if (onStep) onStep(snapshot);
  }

  return { sorted: arr, steps };
};

export const mergeSort = (array: Skill[], onStep?: OnStepCallback) => {
  const arr = [...array]; // Copy the input array
  const steps: Skill[][] = [];

  const merge = (arr: Skill[], left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0; // Pointer for left array
    let j = 0; // Pointer for right array
    let k = left; // Pointer for the main array

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i].level > rightArr[j].level) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }

    // Copy remaining elements from left array
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    // Copy remaining elements from right array
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }

    // Capture the current state of the entire array
    steps.push([...arr]);
    if (onStep) onStep([...arr]);
  };

  const mergeSortRec = (arr: Skill[], left: number, right: number) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);

      mergeSortRec(arr, left, mid);
      mergeSortRec(arr, mid + 1, right);
      merge(arr, left, mid, right);
    }
  };

  mergeSortRec(arr, 0, arr.length - 1);

  return { sorted: arr, steps };
};

export const quickSort = (arr: Skill[]) => {
  const steps: Skill[][] = [];
  const array = [...arr];

  // Helper function to check if two steps (arrays) are equal.
  // Assumes the order of elements is important.
  const stepsAreEqual = (a: Skill[], b: Skill[]) =>
    a.length === b.length &&
    a.every(
      (skill, i) => skill.level === b[i].level && skill.name === b[i].name
    );

  // Add a step if it is not a duplicate of the previous step.
  const pushStepIfUnique = (current: Skill[]) => {
    const lastStep = steps[steps.length - 1];
    if (!lastStep || !stepsAreEqual(lastStep, current)) {
      steps.push([...current]);
    }
  };

  const partition = (arr: Skill[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (arr[j].level >= pivot.level) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  };

  const quickSortRec = (arr: Skill[], low: number, high: number) => {
    if (low < high) {
      const pi = partition(arr, low, high);
      // Push the snapshot only if it differs from the last one.
      pushStepIfUnique(arr);
      quickSortRec(arr, low, pi - 1);
      quickSortRec(arr, pi + 1, high);
    }
  };

  quickSortRec(array, 0, array.length - 1);

  return { sorted: array, steps };
};
