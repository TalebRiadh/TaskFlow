import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY, type UserRepositoryPort } from "../domain/user.repository.port";
import { User } from "../domain/user.entity";



@Injectable()
export class FindUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepositoryPort
    ){}

    async execute(id: string): Promise<User> {
        const user = await this.userRepo.findById(id)
        if (!user) {
            throw new NotFoundException(`User ${id} not found`)
        }
        return user
    }
}