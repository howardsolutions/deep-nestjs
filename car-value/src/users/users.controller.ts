import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { Serialize } from 'src/interceptors/serrialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto.';
import { AuthService } from 'src/auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post("/signup")
    createUser(body: CreateUserDto) {
        return this.authService.singup(body.email, body.password)
    }

    @Get("/:id")
    findUser(@Param('id') id: string) {
        return this.userService.findOne(parseInt(id));
    }

    @Get('')
    findAllUsers(@Query("email") email: string) {
        return this.userService.find(email);
    }

    @Delete("/:id")
    deleteUser(@Param('id') id: string) {
        const user = this.userService.remove(parseInt(id));
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    @Patch("/:id")
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const user = this.userService.update(parseInt(id), body);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }
}
