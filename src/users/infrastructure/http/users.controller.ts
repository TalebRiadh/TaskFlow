import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { CreateUserUseCase } from 'src/users/application/create-user.use-case';
import { FindUserUseCase } from 'src/users/application/find-user.use-case';
import { UserReponseDto } from 'src/users/application/dto/user-response.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findUserUseCase: FindUserUseCase,
    ) {}

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserReponseDto> {
        const user = await this.createUserUseCase.execute(dto)
        return UserReponseDto.fromDomain(user)
    }

    @Get('id')
    async findOne(@Param('id') id: string): Promise<UserReponseDto> {
        const user = await this.findUserUseCase.execute(id)
        return UserReponseDto.fromDomain(user)
    }
}
