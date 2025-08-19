import { IsEmail, IsNotEmpty, IsString, Validate, IsArray, IsEnum } from 'class-validator';
import { PasswordStrengthValidator } from '../../common/validators/password-strength.validator';
import { Role } from '../../auth/roles/role.enum';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray() // Garante que o valor é um array
  @IsEnum(Role, { each: true }) // Garante que cada item no array é um valor válido da enum
  @IsNotEmpty()
  roles: Role[];
}