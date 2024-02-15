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
import { RESPONSE_MESSAGES } from 'src/constants/constants';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

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
