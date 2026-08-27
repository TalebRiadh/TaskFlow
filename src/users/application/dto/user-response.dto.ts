


export class UserReponseDto {
    id: string
    email: string
    name: string
    createdAt: Date


    static fromDomain(user: {id: string, email: string, name: string, createdAt: Date}): UserReponseDto{
        const dto = new UserReponseDto()
        dto.id = user.id
        dto.email = user.email
        dto.name = user.name
        dto.createdAt = user.createdAt
        
        return dto
    }
}