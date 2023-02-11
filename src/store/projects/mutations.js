/* eslint-disable no-console */

export const setProjects = (state, newValue) => {
  state.projects = newValue;
};

export const setProject = (state, newData) => {
  state.projects = state.projects.map((project) => {
    if (project.id === newData.id) {
      project = { ...project, ...newData };
    }
    return project;
  });
};

export const addProject = (state, newData) => {
  state.projects.push(newData);
};

export const deleteProject = (state, projectId) => {
  state.projects = state.projects.filter(({ id }) => id !== projectId);
};

export const setCurrentProjectId = (state, projectId) => {
  state.currentProjectId = projectId;
};

export const setCurrentProject = (state, currentProject) => {
  state.currentProject = currentProject;
};

export const setLoadingProjects = (state, loadingProjects) => {
  state.loadingProjects = loadingProjects;
};

export const setSavingProject = (state, saving) => {
  state.savingProject = saving;
};

export const setDeletingProject = (state, deletingProject) => {
  state.deletingProject = deletingProject;
};
