import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //@Post('create')
  @MessagePattern('create_user')
  create(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  @MessagePattern('find_all')
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  @MessagePattern('find_user')
  findOne(@Payload('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern('update_user')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  // @Delete(':id')
  @MessagePattern('delete_user')
  remove(@Payload('id') id: string) {
    return this.usersService.remove(+id);
  }
}
