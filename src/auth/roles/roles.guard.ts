import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();

    // Lógica para o super-papel `Audit`
    // Se o usuário tem o papel `Audit`, ele tem acesso a TUDO.
    if (user.roles?.includes(Role.Audit)) {
      return true;
    }

    // Se não for `Audit`, verifica se o usuário tem qualquer uma das roles necessárias
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}