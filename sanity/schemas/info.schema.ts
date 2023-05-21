const info = {
  name: "info",
  title: "Info",
  type: "document",
  fields: [
    {
      name: "bio",
      title: "Bio",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
  ],
};

export default info;
