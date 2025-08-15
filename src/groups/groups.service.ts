import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository : Repository<Group>,
  ){}


  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const newGroup = this.groupRepository.create(createGroupDto);
    return this.groupRepository.save(newGroup);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.find();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({where : {id}});
    if(!group){
      throw new NotFoundException(`Grupo não localizado`);
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);
    this.groupRepository.merge(group, updateGroupDto);
    return this.groupRepository.save(group);
  }

  async remove(id: number) {
    const result = await this.groupRepository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`Grupo não localizado`);
    }
  }
}
