import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  constructor(@Inject('USERS_SERVICE') private rabbitClient: ClientProxy) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async create(createUserDto: CreateUserDto) {
    this.rabbitClient.emit('create_user', createUserDto);
    return {
      status: 'ok',
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { id: __, ...data } = updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
