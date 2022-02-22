import * as yup from 'yup';
import { ErrorMessages } from '../../constants';

export const RegisterUserRequest = yup.object().shape({
  // name: yup.string().required(),
  login: yup.string().required(),
  // surname: yup.string().required(),
  email: yup.string().email().transform((value) => value.toLowerCase()).required(),
  // companyId: yup.string().uuid(),
  password: yup.string()
    .min(6, ErrorMessages.invalid_password_min_length)
    .max(128, ErrorMessages.invalid_password_max_length)
    .matches(/^[^\s]+$/, ErrorMessages.invalid_password_no_spaces)
    .matches(/[\d.@#$%^&*!]/, ErrorMessages.invalid_password_digit_or_special)
    .required(),
});
