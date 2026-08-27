import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from "../application/dto/create-user.dto";


export class UpdateUserDto extends PartialType(CreateUserDto) {}