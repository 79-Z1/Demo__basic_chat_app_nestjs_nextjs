import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('users') 
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'Bearer token for authentication.',
  schema: {
    type: 'string',
  },
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  findAllExeptUser(@Param('userId') id: string) {
    return this.userService.findAllExeptUser(+id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
