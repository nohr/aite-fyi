const project = {
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    {
      name: "text",
      title: "Text",
    },
    {
      name: "content",
      title: "Content",
    },
  ],
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
      name: "rank",
      title: "Rank",
      type: "number",
    },
    {
      name: "medium",
      title: "Item",
      type: "string",
      options: {
        list: [
          { title: "Web Development", value: "website" },
          { title: "Interactive", value: "interactive" },
          { title: "Graphic Design", value: "design" },
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
      group: "content",
    },
    {
      name: "content",
      title: "Content",
      group: "text",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      group: "content",
      of: [
        {
          name: "Image",
          title: "Image",
          type: "image",
        },
      ],
    },
    {
      name: "videos",
      title: "Videos",
      type: "array",
      group: "content",
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
