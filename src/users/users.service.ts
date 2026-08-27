import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users: any[] = []

    create(dto: CreateUserDto) {
        const exists = this.users.some(u => u.email === dto.email)
        if (exists) throw new ConflictException('Email already registered')

        const user = {id: randomUUID, ...dto, createdAt: new Date()}
        this.users.push(user)
        return user
    }

    update(id: string, dto: UpdateUserDto) {
        const user = this.findOne(id)

        if(dto.email && dto.email !== user.email) {
            const emailExists = this.users.some(
                u => u.email === dto.email && u.id !== id 
            )

            if (emailExists) {
                throw new ConflictException('Email already registered')
            }
        }

        Object.assign(user, dto)
        
        return user
    }

    findAll() {
        return this.users
    }

    findOne(id: string) {
        const user = this.users.find(u => u.id === id)
        if (!user) throw new NotFoundException(`User ${id} not found`)
        return user
    }
}
