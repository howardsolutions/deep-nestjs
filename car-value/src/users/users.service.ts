import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repository: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repository.create({ email, password });

        return this.repository.save(user);
    }

    findOne(id: number) {
        if (!id) return null;
        return this.repository.findOne({ where: { id } });
    }

    find(email: string) {
        return this.repository.find({ where: { email } });
    }

    async update(id: number, attributes: Partial<User>) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException("User Not found")
        }

        Object.assign(user, attributes);

        return this.repository.save(user);
    }

    async remove(id: number) {
        const user = await this.findOne(id);

        if (!user) {
            throw new NotFoundException("User Not found")
        }

        return this.repository.remove(user)
    }
}
