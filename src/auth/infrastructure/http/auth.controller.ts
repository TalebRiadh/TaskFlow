import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { LoginDto } from "src/auth/application/dto/login.dto";
import { LoginUseCase } from "src/auth/application/login.use-case";
import { RefreshTokenUseCase } from "src/auth/application/refresh-token.use-case";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { Throttle } from "@nestjs/throttler";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase
    ) {}

    @Throttle({ default: { limit: 5, ttl: 60000 } })
    @Post('login')
    loogin(@Body() dto: LoginDto) {
        return this.loginUseCase.execute(dto)
    }

    @UseGuards(JwtRefreshGuard)
    @Post('refresh')
    refresh(@Req() req: Request & {user: {userId: string}}) {
        return this.refreshTokenUseCase.execute(req.user.userId)
    }
}