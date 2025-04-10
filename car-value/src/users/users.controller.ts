import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session } from '@nestjs/common';
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


    @Get('/whoami')
    whoAmI(@Session() session: any) {
        return this.userService.findOne(session.userId);
    }

    @Post("/signup")
    async createUser(body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password)
        session.userId = user.id

        return user;
    }

    @Post("/signin")
    async signin(body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password)
        session.userId = user.id;
        return user;
    }

    @Post("/signout")
    async signout(@Session() session: any) {
        session.userId = null;
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
