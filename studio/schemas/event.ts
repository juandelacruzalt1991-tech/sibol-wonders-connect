export default {
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Event Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    },
  ],
}
