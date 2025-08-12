import { PartialType } from '@nestjs/mapped-types';
import { CreateUserStatusDto } from './create-user_status.dto';

export class UpdateUserStatusDto extends PartialType(CreateUserStatusDto) {}
