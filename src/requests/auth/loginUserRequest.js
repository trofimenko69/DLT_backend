import * as yup from 'yup';

export const LoginUserRequest = yup.object().required().shape({
  email: yup.string().email().transform((value) => value.toLowerCase()).required(),
  password: yup.string().required(),
});
