import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserStatusDto } from './dto/create-user_status.dto';
import { UpdateUserStatusDto } from './dto/update-user_status.dto';
import { UserStatus } from './entities/user_status.entity';

@Injectable()
export class UserStatusService {
  constructor(
    @InjectRepository(UserStatus)
    private userStatusRepository: Repository<UserStatus>,
  ) {}

  async create(createUserStatusDto: CreateUserStatusDto): Promise<UserStatus> {
    const newUserStatus = this.userStatusRepository.create(createUserStatusDto);
    return this.userStatusRepository.save(newUserStatus);
  }

  async findAll(): Promise<UserStatus[]> {
    return this.userStatusRepository.find();
  }

  async findOne(id: number): Promise<UserStatus> {
    const userStatus = await this.userStatusRepository.findOne({ where: { id } });
    if (!userStatus) {
      throw new NotFoundException(`Status com ID ${id} não encontrado.`);
    }
    return userStatus;
  }

  async update(id: number, updateUserStatusDto: UpdateUserStatusDto): Promise<UserStatus> {
    const userStatus = await this.findOne(id);
    this.userStatusRepository.merge(userStatus, updateUserStatusDto);
    return this.userStatusRepository.save(userStatus);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userStatusRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Status com ID ${id} não encontrado.`);
    }
  }
}
