import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import * as bcrypt from 'bcrypt';
import { RESPONSE_MESSAGES } from '../constants/constants';


@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, name } = createUserDto;

    const candidate = await this.userRepository.findOne({ where: { email } });

    if (candidate) {
      throw new NotFoundException(RESPONSE_MESSAGES.ERROR);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userRepository
      .save({ email, password: hashedPassword, name })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
