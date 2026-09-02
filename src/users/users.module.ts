import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/persistence/user.orm-entity';
import { CreateUserUseCase } from './application/create-user.use-case';
import { USER_REPOSITORY } from './domain/user.repository.port';
import { TypeOrmUserRepository } from './infrastructure/persistence/typeorm-user.repository';
import { FindUserUseCase } from './application/find-user.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: TypeOrmUserRepository,
    }
  ],
  exports: [USER_REPOSITORY]
})
export class UsersModule {}
