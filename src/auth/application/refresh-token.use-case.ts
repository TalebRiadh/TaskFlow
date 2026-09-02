import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { USER_REPOSITORY, type UserRepositoryPort } from "src/users/domain/user.repository.port";



@Injectable()
export class RefreshTokenUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly useRepo: UserRepositoryPort,
        private readonly jwtService: JwtService,
    ) {}

    async execute(userId: string): Promise<{accessToken: string}> {
        const user = await this.useRepo.findById(userId)
        if (!user) throw new UnauthorizedException('User no longer exists')


        const payload = {sub: user.id, email: user.email}
        const accessToken = this.jwtService.sign(payload, {expiresIn: '15m'})
        return {accessToken}
    }
}