import { SetMetadata } from "@nestjs/common"
import { GlobalRole } from "src/users/domain/user.entity"


export const ROLES_KEY = 'roles'
export const Roles = (...roles: GlobalRole[]) => SetMetadata(ROLES_KEY, roles)