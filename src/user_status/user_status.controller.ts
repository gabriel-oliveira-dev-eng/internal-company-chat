import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserStatusService } from './user_status.service';
import { CreateUserStatusDto } from './dto/create-user_status.dto';
import { UpdateUserStatusDto } from './dto/update-user_status.dto';

@Controller('user-status')
export class UserStatusController {
  constructor(private readonly userStatusService: UserStatusService) {}

  @Post()
  create(@Body() createUserStatusDto: CreateUserStatusDto) {
    return this.userStatusService.create(createUserStatusDto);
  }

  @Get()
  findAll() {
    return this.userStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserStatusDto: UpdateUserStatusDto) {
    return this.userStatusService.update(+id, updateUserStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userStatusService.remove(+id);
  }
}
