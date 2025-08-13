import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'isPasswordStrong', async: false })
export class PasswordStrengthValidator implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    const strongRegex = new RegExp(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
    );
    return strongRegex.test(password);
  }

  defaultMessage(args: ValidationArguments) {
    return 'A senha deve conter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial.';
  }
}