/* eslint-disable no-console */

export const setUsers = (state, newValue) => {
  state.users = newValue;
};

export const setEditUserDialog = (state, editUserDialog) => {
  state.editUserDialog = editUserDialog
}

export const setLoadingUsers = (state, loadingUsers) => {
  state.loadingUsers = loadingUsers;
};

export const setSavingUser = (state, savingUser) => {
  state.savingUser = savingUser;
};
