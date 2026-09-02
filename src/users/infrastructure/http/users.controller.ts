import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { CreateUserUseCase } from 'src/users/application/create-user.use-case';
import { FindUserUseCase } from 'src/users/application/find-user.use-case';
import { UserResponseDto } from 'src/users/application/dto/user-response.dto';
import { CurrentUser } from 'src/auth/infrastructure/http/decorators/current-use.decorator';
import { JwtAuthGuard } from 'src/auth/infrastructure/http/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly findUserUseCase: FindUserUseCase,
    ) {}

    @Post()
    async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
        const user = await this.createUserUseCase.execute(dto)
        return UserResponseDto.fromDomain(user)
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<UserResponseDto> {
        const user = await this.findUserUseCase.execute(id)
        return UserResponseDto.fromDomain(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@CurrentUser() user: { userId: string; email: string }) {
    return user;
}
}
