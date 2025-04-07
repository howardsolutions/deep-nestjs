import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repository.create({email, password});

        return this.repository.save(user);
    }
}
