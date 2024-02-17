import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn((dto) => dto),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('должен залогинить пользователя', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Иван',
      email: 'ivan.ivanov@example.com',
      password: '123456',
    };

    expect(await authController.login(createUserDto)).toEqual(createUserDto);
    expect(authService.login).toHaveBeenCalledWith(createUserDto);
  });

  it('должен вернуть User not login при неправильных учетных данных', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Иван',
      email: 'ivan.ivanov@example.com',
      password: '123456',
    };

    // Модифицируем mock для authService.login, чтобы возвращать null
    jest.spyOn(authService, 'login').mockResolvedValue(null);

    await expect(authController.login(createUserDto)).rejects.toThrowError(
      'User not login',
    );
    expect(authService.login).toHaveBeenCalledWith(createUserDto);
  });
});
