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
import { USER_INPUT_MESSAGES } from '../constants/constants';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import {
  TokenResponse,
  NotFoundResponseUser,
  UnauthorizeUserResponse,
  BadResponseUser,
} from '../types/type';

@ApiTags('User')
@Controller('users')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, type: TokenResponse, description: 'JWT Token' })
  @ApiResponse({
    status: 400,
    type: BadResponseUser,
    description: 'Bad Request',
  })
  @ApiResponse({
    status: 401,
    type: UnauthorizeUserResponse,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    type: NotFoundResponseUser,
    description: 'Not Found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @UsePipes(ValidationPipe)
  @ApiBody({ type: AuthUserDto })
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
