import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserGroupDto {
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    group_id: number;
}
