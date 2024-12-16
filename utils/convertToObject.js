export const convertToSerializableObject = (leanDocument) => {
  //check to see if each of the properties have a toJson or tostring method
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }
  return leanDocument;
};
