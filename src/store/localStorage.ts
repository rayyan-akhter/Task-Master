
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('taskMasterState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('taskMasterState', serializedState);
  } catch {
    // Ignore write errors
  }
};
