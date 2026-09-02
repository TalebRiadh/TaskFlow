import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./infrastructure/http/auth.controller";
import { LoginUseCase } from "./application/login.use-case";
import { RefreshTokenUseCase } from "./application/refresh-token.use-case";
import { JwtStrategy } from "./infrastructure/http/strategies/jwt.strategy";
import { JwtRefreshStrategy } from "./infrastructure/http/strategies/jwt-refresh.strategy";



@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '15m'}
            }),
        }),
    ],
    controllers: [AuthController],
    providers: [LoginUseCase, RefreshTokenUseCase, JwtStrategy,  JwtRefreshStrategy],
})
export class AuthModule {}