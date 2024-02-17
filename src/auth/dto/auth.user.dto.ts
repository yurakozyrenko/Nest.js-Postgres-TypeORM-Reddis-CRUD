import { IsString, IsNotEmpty, IsEmail} from 'class-validator';
import { USER_INPUT_MESSAGES } from '../../constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  @IsEmail({}, { message: USER_INPUT_MESSAGES.ERROR_EMAIL })
  @IsString({ message: USER_INPUT_MESSAGES.ERROR_EMAIL_TYPE })
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsNotEmpty({ message: USER_INPUT_MESSAGES.ERROR_PASSWORD_LENGTH })
  @IsString({ message: USER_INPUT_MESSAGES.ERROR_PASSWORD })
  password: string;
}
