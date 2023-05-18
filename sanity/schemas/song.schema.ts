const song = {
  name: "song",
  title: "Song",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Song Title",
      type: "string",
    },
    {
      name: "artist",
      title: "Artist",
      type: "string",
    },
    {
      name: "album",
      title: "Album",
      type: "string",
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "file",
      title: "File",
      type: "file",
    },
    {
      name: "cover",
      title: "Cover",
      type: "image",
    },
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          name: "link",
          title: "Link",
          type: "object",
          fields: [
            {
              name: "url",
              title: "URL",
              type: "url",
            },
            {
              name: "name",
              title: "Name",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};

export default song;
