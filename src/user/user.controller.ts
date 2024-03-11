import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  HttpStatus,
  NotFoundException,
  Put,
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { validate as isValidUUID } from 'uuid';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.NotUuidCheck(id);
    const user = this.userService.findOne(id);
    this.NotFoundCheck(user, id);
    return user;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    this.NotUuidCheck(id);
    const user = this.userService.findOne(id);
    this.NotFoundCheck(user, id);
    this.PasswordCheck(id, updatePasswordDto);
    return this.userService.update(id, updatePasswordDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.ExceptionsCheck(id);
    this.userService.remove(id);
    return null;
  }

  private ExceptionsCheck(id: string) {
    this.NotUuidCheck(id);
    const user = this.userService.findOne(id);
    this.NotFoundCheck(user, id);
    return user;
  }

  private PasswordCheck(id: string, updatePasswordDto: UpdatePasswordDto) {
    if (!this.userService.isUserPassMatch(id, updatePasswordDto)) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: `ERROR: password is wrong`,
      });
    }
  }

  private NotUuidCheck(id: string) {
    if (!isValidUUID(id)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `ERROR: userId = ${id} is invalid (not uuid)`,
      });
    }
  }

  private NotFoundCheck(user: User | Partial<User>, id: string) {
    if (user === undefined) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `ERROR: user with userId = ${id} doesn't exist`,
      });
    }
  }
}
