import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    // ClientsModule.register([
    //   { name: 'USERS_SERVICE', transport: Transport.RMQ },
    // ]),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'users_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
})
export class UsersModule {}
