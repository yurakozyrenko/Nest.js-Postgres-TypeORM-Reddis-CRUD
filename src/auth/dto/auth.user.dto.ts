import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { USER_INPUT_MESSAGES } from 'src/constants/constants';

export class AuthUserDto {
  @IsEmail({}, { message: USER_INPUT_MESSAGES.ERROR_EMAIL })
  @IsString({ message: USER_INPUT_MESSAGES.ERROR_EMAIL_TYPE })
  email: string;

  @IsNotEmpty({ message: USER_INPUT_MESSAGES.ERROR_PASSWORD_LENGTH })
  @IsString({ message: USER_INPUT_MESSAGES.ERROR_PASSWORD })
  password: string;
}
