import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
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

  async findOne(id: string): Promise<User | null> {
    const user = await this.userExistCheck(id);
    return user;
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create({
      login: createUserDto.login,
      password: createUserDto.password,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    if (!user) {
      throw new BadRequestException('ERROR: invalid request body');
    }

    return this.usersRepository.save(user);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    await this.userExistCheck(id);

    const validPass = await this.isUserPassMatch(id, updatePasswordDto);
    if (!validPass) {
      throw new ForbiddenException('ERROR: invalid password');
    }

    await this.usersRepository.update(id, {
      password: updatePasswordDto.newPassword,
      updatedAt: Date.now(),
    });

    return await this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.userExistCheck(id);
    await this.usersRepository.delete(id);
  }

  async isUserPassMatch(id: string, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword } = updatePasswordDto;
    const user = await this.usersRepository.findOneBy({ id });
    return oldPassword === user.password;
  }

  async userExistCheck(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(
        `ERROR: user with userId = ${id} doesn't exist`,
      );
    }
    return user;
  }
}
