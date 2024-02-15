import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { USER_INPUT_MESSAGES } from 'src/constants/constants';

export class CreateUserDto {
  @IsEmail({}, { message: USER_INPUT_MESSAGES.ERROR_EMAIL })
  @IsString({ message: USER_INPUT_MESSAGES.ERROR_EMAIL_TYPE })
  email: string;

  @IsNotEmpty({ message: USER_INPUT_MESSAGES.ERROR_PASSWORD_LENGTH })
  @IsString({ message: USER_INPUT_MESSAGES.ERROR_PASSWORD })
  password: string;

  @IsNotEmpty({ message: USER_INPUT_MESSAGES.ERROR_NAME })
  @IsString({ message: USER_INPUT_MESSAGES.ERROR_NAME_TYPE })
  name: string;
}
