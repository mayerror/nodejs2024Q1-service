import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return this.usersRepository.save(user);
  }
  // findAll() {
  //   return this.users.map((user) => {
  //     return this.removePassword(user);
  //   });
  // }

  // findOne(id: string) {
  //   const user = this.users.find((user) => user.id === id);
  //   return this.removePassword(user);
  // }

  // update(id: string, updatePasswordDto: UpdatePasswordDto) {
  //   const user = this.users.find((user) => user.id === id);
  //   user.password = updatePasswordDto.newPassword;
  //   user.updatedAt = Date.now();
  //   user.version++;
  //   return this.removePassword(user);
  // }

  // remove(id: string) {
  //   const index = this.users.findIndex((user) => user.id === id);
  //   this.users.splice(index, 1);
  // }

  // isUserPassMatch(id: string, updatePasswordDto: UpdatePasswordDto) {
  //   const { oldPassword } = updatePasswordDto;
  //   const user = this.users.find((user) => user.id === id);
  //   return oldPassword === user.password;
  // }

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
