import { AuthUserDto } from './dto/auth.user.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { USER_INPUT_MESSAGES } from 'src/constants/constants';

@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post('/login')
  @HttpCode(200)
  async login(@Body() authDto: AuthUserDto) {
    const token = await this.authService.login(authDto);
    if (!token) {
      throw new BadRequestException(USER_INPUT_MESSAGES.ERROR_LOGIN);
    }
    return token;
  }
}
