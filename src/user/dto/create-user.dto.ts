import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { PasswordStrengthValidator } from '../../common/validators/password-strength.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Validate(PasswordStrengthValidator)
  password: string;
}