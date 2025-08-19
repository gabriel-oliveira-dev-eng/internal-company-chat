import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, IsNotEmpty, IsEmail, MinLength, IsNumber } from 'class-validator';
import { Role } from 'src/auth/roles/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password: string;
  
  @IsNumber()
  @IsNotEmpty()
  statusId: number;

  @Column({
    type: 'simple-json', // Use simple-json for MariaDB to store an array
    default: JSON.stringify([Role.User]), // Default value should be an array
  })
  roles: Role[];


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}