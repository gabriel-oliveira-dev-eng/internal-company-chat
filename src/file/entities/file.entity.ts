import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { IsNumber, IsString,IsNotEmpty } from "class-validator";

@Entity()
export class File{
    @PrimaryGeneratedColumn()
    @IsNumber()
    @IsNotEmpty()
    id: number;
    
    @Column()
    @IsString()
    @IsNotEmpty()
    type: string;
    
    @Column()
    @IsString()
    @IsNotEmpty()
    path: string;
    
    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
    
}