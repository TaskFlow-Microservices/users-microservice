import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  position: string;
}
