import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);
    return this.removePassword(user);
  }

  findAll() {
    return this.users.map((user) => {
      return this.removePassword(user);
    });
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    return this.removePassword(user);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.find((user) => user.id === id);
    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version++;
    return this.removePassword(user);
  }

  remove(id: string) {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  }

  isUserPassMatch(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword } = updatePasswordDto;
    const user = this.users.find((user) => user.id === id);
    return oldPassword === user.password;
  }

  private removePassword(user?: User) {
    if (user === undefined) {
      return user;
    }
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
