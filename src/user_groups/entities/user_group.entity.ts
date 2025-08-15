import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmail, MinLength, IsNumber } from 'class-validator';

@Entity()
export class UserGroup {
    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @Column()
    @IsNumber()
    @IsNotEmpty()
    group_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
