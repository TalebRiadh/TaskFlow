import { InjectRepository } from "@nestjs/typeorm";
import { UserRepositoryPort } from "src/users/domain/user.repository.port";
import { UserOrmEntity } from "./user.orm-entity";
import { Repository } from "typeorm";
import { User } from "src/users/domain/user.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class TypeOrmUserRepository implements UserRepositoryPort {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repo: Repository<UserOrmEntity>
    ){}

    async findByEmail(email: string): Promise<User | null> {
        const row = await this.repo.findOneBy({email})
        return row ? this.toDomain(row) : null
    }

    async findById(id: string): Promise<User | null> {
        const row = await this.repo.findOneBy({id})
        return row ? this.toDomain(row) : null
    }

    async save(user: User): Promise<void> {
        await this.repo.save({
            id: user.id,
            eamil: user.email,
            name: user.name,
            password: user.getHashedPassword(),
            createdAt: user.createdAt
        })
    }

    private toDomain(row: UserOrmEntity): User {
        return new User(row.id, row.email, row.name, row.password, row.createdAt)
    }
}