import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsNotEmpty, IsEmail, MinLength, IsNumber } from 'class-validator';

@Entity()
export class UserStatus {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  statusName: string;
  
  @IsString()
  @IsNotEmpty()
  color: string;
  
  @IsNumber()
  @IsNotEmpty()
  @MinLength(4)
  notification: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
