import { IsEmail, IsNotEmpty, IsString, Validate, IsArray, IsEnum } from 'class-validator';
import { PasswordStrengthValidator } from '../../common/validators/password-strength.validator';
import { Role } from '../../auth/roles/role.enum';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  @IsNotEmpty()
  roles: Role[];
}