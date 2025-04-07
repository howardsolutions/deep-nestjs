import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {
    @Post("/signup")
    createUser(body: CreateUserDto) {
        console.log(body)
    }
}
