import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users/users.service";
import { promisify } from "util";
import { scrypt as _scrypt, randomBytes } from "crypto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async signup(email: string, password: string) {
        // see if email is in use 
        const users = await this.userService.find(email);
        if (users.length) {
            throw new BadRequestException("Email in use")
        }

        // Hash the users password
        // Generate a salt
        const salt = randomBytes(8).toString("hex");
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Hash the salt and password together
        const hashedPassword = salt + '.' + hash.toString("hex");

        // Create a new user and save it
        const user = await this.userService.create(email, hashedPassword)

        // return the user
        return user
    }

    async signin(email: string, password: string) {
        const [user] = await this.userService.find(email);

        if (!user) {
            throw new NotFoundException("User not found")
        };

        const [salt, storedHashedPassword] = user.password.split(".");

        const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHashedPassword !== hashedPassword.toString("hex")) {
            throw new BadRequestException("Bad Password")
        }

        return user;
    }
} 