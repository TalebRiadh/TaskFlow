import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY, type UserRepositoryPort } from "src/users/domain/user.repository.port";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepositoryPort,
        private readonly jwtService: JwtService,
    ) {}


    async execute(dto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.userRepo.findByEmail(dto.email)
        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isValid = await user.validatePassword(dto.password)
        if (!isValid) {
            throw new UnauthorizedException('Invalid crededntials')
        }

        const payload = {suub: user.id, email: user.email}

        const accessToken = this.jwtService.sign(payload, {expiresIn: '15m'})
        const refreshToken = this.jwtService.sign(payload, {expiresIn: '7d'})

        return {accessToken, refreshToken}
    }
}