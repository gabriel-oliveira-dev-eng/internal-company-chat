import {IsString, IsNotEmpty } from "class-validator";
export class CreateFileDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    path: string;

}