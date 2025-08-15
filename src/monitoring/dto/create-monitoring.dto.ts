import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMonitoringDto {
    @IsString()
    @IsNotEmpty()
    backtrace: string;
}
