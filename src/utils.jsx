export const filterTaskList = (item, filterOptions) => {
  let flag = true;
  const { dueDate, boardName, status, priority } = filterOptions;
  if (
    (dueDate && dueDate !== item.dueDate) ||
    (boardName && boardName !== item.boardName) ||
    (status && status !== item.status) ||
    (priority && priority !== item.priority)
  ) {
    flag = false;
  }
  return flag;
};

export const isValidJSON = (jsonstring) => {
  try {
    JSON.parse(jsonstring);
    return true;
  } catch (error) {
    return false;
  }
};
