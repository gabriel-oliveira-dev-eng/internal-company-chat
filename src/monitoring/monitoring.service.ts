import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoring } from './entities/monitoring.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonitoringService {
  constructor(@InjectRepository(Monitoring) private monitoringRepository: Repository<Monitoring>,){}

  async create(createMonitoringDto: CreateMonitoringDto): Promise<Monitoring> {
    const newMonitoring = this.monitoringRepository.create(createMonitoringDto);
    return this.monitoringRepository.save(newMonitoring);
  }

  async findAll(): Promise<Monitoring[]> {
    return this.monitoringRepository.find();
  }

  async findOne(id: number) {
      const monitoring = await this.monitoringRepository.findOne({ where: { id } });
      if (!monitoring) {
        throw new NotFoundException(`Monitoramento com ID ${id} não encontrado.`);
      }
      return monitoring;
  }

  async update(id: number, updateMonitoringDto: UpdateMonitoringDto) {
    const monitoring = await this.findOne(id);
    this.monitoringRepository.merge(monitoring, updateMonitoringDto);
    return this.monitoringRepository.save(monitoring);
  }

  async remove(id: number) {
    const result = await this.monitoringRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Monitoramento com ID ${id} não encontrado.`);
    }
  }
}
