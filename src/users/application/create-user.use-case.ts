import { ConflictException, Inject } from "@nestjs/common";
import { USER_REPOSITORY, type UserRepositoryPort } from "../domain/user.repository.port";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import { User } from "../domain/user.entity";
import { randomUUID } from "crypto";


export class CreateUserUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepo: UserRepositoryPort,
    ) {}

    async execute(dto: CreateUserDto): Promise<User> {
        const existing = await this.userRepo.findByEmail(dto.email)
        if (existing) throw new ConflictException('Email already registered')

        const hashedPassword = await bcrypt.hash(dto.password, 10)
        const user = User.create({
            id: randomUUID(),
            email: dto.email,
            name: dto.name,
            hashedPassword,
        })

        await this.userRepo.save(user)
        return user
    }
}