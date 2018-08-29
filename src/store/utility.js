function updateObject(oldObject, updatedProperties) {
  return {
    ...oldObject,
    ...updatedProperties,
  };
}

export default updateObject;
