import * as bcrypt from 'bcrypt';


export enum GlobalRole {
    ADMIN = 'admin',
    USER = 'user',
}

export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly hashedPassword: string,
        public readonly createdAt: Date,
    ){}

    static create(props: {id: string, email: string, name: string, hashedPassword: string }): User {
        if (!props.email.includes('@')) {
            throw new Error('Invalid email')
        }
        return new User(props.id, props.email, props.name, props.hashedPassword,  new Date())
    }

    getHashedPassword(): string {
        return this.hashedPassword
    }

    async validatePassword(plainPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, this.hashedPassword)
    }
}