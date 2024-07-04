import { HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';
import { PaginationDto } from 'src/common//dto/pagination.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async create(args: CreateUserDto) {
    try {
      const [checkUser, createUserResult] = await Promise.allSettled([
        this.findByEmail(args.email),
        this.users.create({
          data: { ...args, password: bcrypt.hashSync(args.password, 10) },
        }),
      ]);

      if (checkUser.status === 'fulfilled' && checkUser.value !== null) {
        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'User already exists',
        });
      }

      if (createUserResult.status === 'fulfilled') {
        return {
          status: 'ok',
        };
      }
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const users = await this.users.findMany({
        select: {
          uuid: true,
          firstname: true,
          lastname: true,
          username: true,
          createdAt: true,
        },
        take: paginationDto.limit,
        skip: (page - 1) * limit,
      });

      return users;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findByEmail(email: string) {
    try {
      return this.users.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findByUuid(uuid: string) {
    try {
      const checkUser = await this.users.findFirst({
        where: {
          uuid,
        },
        select: {
          uuid: true,
          firstname: true,
          lastname: true,
          username: true,
          password: true,
          createdAt: true,
        },
      });

      if (!checkUser) {
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        });
      }

      return checkUser;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async update(uuid: string, args: UpdateUserDto) {
    try {
      const user = await this.findByUuid(uuid);

      const hashedPassword = bcrypt.hashSync(user.password, 10);

      await this.users.update({
        where: {
          uuid: user.uuid,
        },
        data: {
          ...args,
          password: hashedPassword,
        },
      });

      return {
        status: 'ok',
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async remove(uuid: string) {
    try {
      const user = await this.findByUuid(uuid);

      await this.users.update({
        where: {
          uuid: user.uuid,
        },
        data: {
          deletedAt: new Date(),
        },
      });

      return {
        status: 'ok',
      };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
