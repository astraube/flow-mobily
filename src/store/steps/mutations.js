
export const setStep = (state, newStep) => {
  state.steps = state.steps.map((step) => {
    if (step.id === newStep.id) {
      step = { ...step, ...newStep };
    }
    return step;
  });
};

export const setSteps = (state, steps) => {
  state.steps = steps;
};

export const addStep = (state, newStep) => {
  state.steps.push(newStep);
};

export const deleteStep = (state, stepId) => {
  state.steps = state.steps.filter(({ id }) => id !== stepId);
};

export const setLoadingSteps = (state, loadingSteps) => {
  state.loadingSteps = loadingSteps;
};

export const setDialogStep = (state, dialogStep) => {
  state.dialogStep = dialogStep;
};

export const setSavingStep = (state, savingStep) => {
  state.savingStep = savingStep;
};

export const setCurrentStep = (state, currentStep) => {
  state.currentStep = currentStep;
};

export const setCurrentStepId = (state, currentSteId) => {
  state.currentSteId = currentSteId;
};

export const setDeletingStep = (state, deletingStep) => {
  state.deletingStep = deletingStep;
};

