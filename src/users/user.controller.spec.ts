import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn((dto) => dto),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UsersService>(UsersService);
  });

  it('должен создать пользователя', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Иван',
      email: 'ivan.ivanov@example.com',
      password: '123456',
    };

    expect(await userController.createUser(createUserDto)).toEqual(
      createUserDto,
    );

    expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('должен вернуть User not register при неудачном создании пользователя', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Иван',
      email: 'ivan.ivanov@example.com',
      password: '123456',
    };
  
    // Модифицируем mock для userService.createUser, чтобы возвращать null
    jest.spyOn(userService, 'createUser').mockResolvedValue(null);
  
    await expect(userController.createUser(createUserDto)).rejects.toThrowError('User not register');
    expect(userService.createUser).toHaveBeenCalledWith(createUserDto);
  });

});
