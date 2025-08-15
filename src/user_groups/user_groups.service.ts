import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserGroupDto } from './dto/create-user_group.dto';
import { UpdateUserGroupDto } from './dto/update-user_group.dto';
import { UserGroup } from './entities/user_group.entity';

@Injectable()
export class UserGroupsService {
  constructor(
    @InjectRepository(UserGroup)
    private usersGroupRepository: Repository<UserGroup>,
  ) {}

  async create(createUserGroupDto: CreateUserGroupDto): Promise<UserGroup> {
    const newUserGroup = this.usersGroupRepository.create(createUserGroupDto);
    return this.usersGroupRepository.save(newUserGroup);
  }

  async findAll(): Promise<UserGroup[]> {
    return this.usersGroupRepository.find();
  }

  async findOne(id: number): Promise<UserGroup> {
    const user = await this.usersGroupRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
  }

  async update(id: number, updateUserGroupDto: UpdateUserGroupDto): Promise<UserGroup> {
    const user = await this.findOne(id);
    this.usersGroupRepository.merge(user, updateUserGroupDto);
    return this.usersGroupRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersGroupRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
  }
}
