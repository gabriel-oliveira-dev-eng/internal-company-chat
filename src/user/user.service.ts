import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/roles/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const newUser = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOneByUsername(username: string) : Promise<User>{
    const user = await this.usersRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${username} não encontrado.`);
    }
    return user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser: any): Promise<User> {
    // 1. Encontre o usuário que será atualizado
    const userToUpdate = await this.findOne(id);
    
    // 2. Lógica de permissão
    const isUserAdminOrAudit = currentUser.roles?.includes(Role.Admin) || currentUser.roles?.includes(Role.Audit);
    const isUpdatingSelf = currentUser.userId === userToUpdate.id;

    if (!isUserAdminOrAudit && !isUpdatingSelf) {
      // Se não for admin/audit e não estiver atualizando o próprio perfil, negue o acesso
      throw new ForbiddenException('Você não tem permissão para editar este usuário.');
    }

    // 3. Continue com a atualização se a permissão for concedida
    if (updateUserDto.email !== undefined) userToUpdate.email = updateUserDto.email;
    if (updateUserDto.password !== undefined) userToUpdate.password = updateUserDto.password;
    
    // Lógica para atualização de roles
    if (updateUserDto.roles !== undefined) {
      if (!isUserAdminOrAudit) {
        // Impede que um usuário comum altere sua própria role
        throw new ForbiddenException('Você não pode alterar sua própria role.');
      } else {
        // Se for admin ou audit, permita a alteração
        userToUpdate.roles = updateUserDto.roles;
      }
    }

    return this.usersRepository.save(userToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
  }
}