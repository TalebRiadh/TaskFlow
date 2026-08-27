import { Module } from '@nestjs/common';
import { UsersController } from './infrastructure/http/users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/persistance/user.orm-entity';
import { CreateUserUseCase } from './application/create-user.use-case';
import { USER_REPOSITORY } from './domain/user.repository.port';
import { TypeOrmUserRepository } from './infrastructure/persistance/typeorm-user.repository';
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
  exports: [UsersService]
})
export class UsersModule {}
