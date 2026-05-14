export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    {
      name: 'heroMedia',
      title: 'Hero Section Media',
      type: 'object',
      fields: [
        {
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: [
              { title: 'Single Image', value: 'image' },
              { title: 'Slideshow', value: 'slideshow' },
              { title: 'Video', value: 'video' }
            ],
            layout: 'radio'
          },
          initialValue: 'image'
        },
        {
          name: 'singleImage',
          title: 'Single Image',
          type: 'image',
          hidden: ({ parent }: any) => parent?.mediaType !== 'image',
          options: { hotspot: true }
        },
        {
          name: 'slideshow',
          title: 'Slideshow Images',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
          hidden: ({ parent }: any) => parent?.mediaType !== 'slideshow'
        },
        {
          name: 'videoUrl',
          title: 'Video File',
          type: 'file',
          options: { accept: 'video/*' },
          hidden: ({ parent }: any) => parent?.mediaType !== 'video'
        }
      ]
    }
  ]
}
