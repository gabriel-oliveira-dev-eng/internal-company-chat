import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserStatusDto {
    @IsString()
    @IsNotEmpty()
    statusName: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsNumber()
    @IsNotEmpty()
    notification: string;
}
