import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(@InjectRepository(File) private fileRespository: Repository<File>,){}

  async create(createFileDto: CreateFileDto): Promise<File> {
    const newFile = this.fileRespository.create(createFileDto);
    return newFile;
  }

  async findAll(): Promise<File[]> {
    const files = this.fileRespository.find();
    return files;
  }

  async findOne(id: number): Promise<File> {
    const file = await this.fileRespository.findOne({where: {id}});
    if(!file){
      throw new NotFoundException(`Arquivo não encontrado`);
    }
    return file;
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<File> {
    const file = await this.findOne(id);
    this.fileRespository.merge(file, updateFileDto);
    return this.fileRespository.save(file);
  }

  async remove(id: number): Promise<void> {
    const result = await this.fileRespository.delete(id);
    if(result.affected === 0){
      throw new NotFoundException(`Arqvui não encontrado`);
    }
  }
}
