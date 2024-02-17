import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { RESPONSE_MESSAGES } from '../constants/constants';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import {
  BadResponseUser,
  NotFoundResponseUser,
  TokenResponse,
} from '../types/type';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({ summary: 'User registration' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: TokenResponse, description: 'JWT Token' })
  @ApiResponse({
    status: 400,
    type: BadResponseUser,
    description: 'Bad Request',
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
  @Post('/registration')
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    if (!user) {
      throw new BadRequestException(RESPONSE_MESSAGES.ERROR_REGISTER);
    }
    return user;
  }
}
