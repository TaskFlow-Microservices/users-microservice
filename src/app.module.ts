import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'USERS_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'users_queue',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
    UsersModule,
  ],
  //exports: [ClientsModule],
})
export class AppModule {}
