import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class UserOrmEntity {
    @PrimaryColumn('uuid')
    id: string

    @Column({ unique: true})
    email: string

    @Column()
    name: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date
}