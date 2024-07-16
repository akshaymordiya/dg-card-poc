import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters long')
    .max(30, 'Name cannot be longer than 50 characters'),
  phone: Yup.string()
    .required('Phone is required')
    .min(2, 'Phone must be at least 2 number long')
    .max(30, 'Phone cannot be longer than 10 number'),

  messages: Yup.string()
    .required('Message is required')
    .min(20, 'Message must be at least 20 characters long')
    .max(700, 'Message cannot be longer than 200 characters')
});