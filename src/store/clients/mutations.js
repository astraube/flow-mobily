/* eslint-disable no-console */

export const setClients = (state, newValue) => {
  state.clients = newValue;
};

export const setClient = (state, newData) => {
  state.clients = state.clients.map((model) => {
    if (model.id === newData.id) {
      model = Object.assign(model, newData);
    }
    return model;
  });
};

export const addClient = (state, newData) => {
  state.clients.push(newData);
};

export const deleteClient = (state, clientId) => {
  state.clients = state.clients.filter(({ id }) => id !== clientId);
};

export const setCurrentClient = (state, currentClient) => {
  state.currentClient = currentClient;
};

export const setCurrentClientId = (state, clientId) => {
  state.currentClientId = clientId;
};

export const setLoadingClients = (state, loadingClients) => {
  state.loadingClients = loadingClients;
};

export const setSavingClient = (state, savingClient) => {
  state.savingClient = savingClient;
};

export const setDeletingClient = (state, deletingClient) => {
  state.deletingClient = deletingClient;
};
