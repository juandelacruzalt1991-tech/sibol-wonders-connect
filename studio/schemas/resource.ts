export default {
  name: 'resource',
  title: 'Resources',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Resource Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'School', value: 'school' },
          { title: 'Therapy Center', value: 'therapy' },
          { title: 'NGO / Foundation', value: 'ngo' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location / Address',
      type: 'string',
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
    },
  ],
}
