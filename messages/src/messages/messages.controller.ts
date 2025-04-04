import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessagesController {
  @Get()
  listMessages() {
    return;
  }

  @Post()
  createMessages(@Body() body: CreateMessageDto) {
    console.log(body);
    return;
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    console.log(id);
    return;
  }
}
