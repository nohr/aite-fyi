const project = {
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Project Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
    },
    {
      name: "medium",
      title: "Item",
      type: "string",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Interactive", value: "interactive" },
          { title: "Design", value: "design" },
        ],
        layout: "radio",
      },
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "url",
      title: "URL",
      type: "array",
      of: [{ type: "url" }],
    },
    {
      name: "program",
      title: "Program",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "VideoObjects",
      type: "array",
      of: [
        {
          name: "VideoObject",
          title: "Video Object",
          type: "object",
          fields: [
            {
              name: "url",
              title: "url",
              type: "file",
            },
            {
              type: "string",
              name: "alt",
              title: "Alt text",
            },
            {
              type: "boolean",
              name: "mobile",
              title: "Mobile",
            },
          ],
        },
      ],
    },
  ],
};

export default project;
