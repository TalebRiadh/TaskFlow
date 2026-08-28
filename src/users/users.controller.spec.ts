import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './infrastructure/http/users.controller';
import { CreateUserUseCase } from './application/create-user.use-case';
import { FindUserUseCase } from './application/find-user.use-case';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: CreateUserUseCase, useValue: { execute: jest.fn() } },
        { provide: FindUserUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});