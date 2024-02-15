import { Injectable, Logger } from '@nestjs/common';
import { AuthUserDto } from './dto/auth.user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt/dist';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { USER_INPUT_MESSAGES } from '../constants/constants';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthUserDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(authDto: AuthUserDto) {
    const user = await this.usersService
      .getUserByEmail(authDto.email)
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (user && (await bcrypt.compare(authDto.password, user.password))) {
      return user;
    }
    throw new UnauthorizedException({
      message: USER_INPUT_MESSAGES.ERROR_EMAIL_PASSWORD,
    });
  }
}
