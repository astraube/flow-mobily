
export const addGroup = (state, newGroup) => {
  state.groups.push(newGroup);
};

export const setGroup = (state, newGroup) => {
  state.groups = state.groups.filter((group) => {
    if (group.id === newGroup.id) {
      group = newGroup;
    }
    return true;
  });

  if (state.currentGroup && state.currentGroup.id === newGroup.id) {
    state.currentGroup = newGroup;
  }
};

export const setGroups = (state, groups) => {
  state.groups = groups;
};

export const setLoadingGroups = (state, loadingGroups) => {
  state.loadingGroups = loadingGroups;
};

export const setSavingGroup = (state, savingGroup) => {
  state.savingGroup = savingGroup;
};

export const setCurrentGroup = (state, currentGroup) => {
  state.currentGroup = currentGroup;
};

export const setCurrentGroupId = (state, currentGroupId) => {
  state.currentGroupId = currentGroupId;
};
