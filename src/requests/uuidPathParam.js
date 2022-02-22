import * as yup from 'yup';

export const UuidPathParam = yup.object().required().shape({
  id: yup.string().uuid().required(),
});
