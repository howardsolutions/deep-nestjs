import { Module } from '@nestjs/common';
import { MessagesController } from './messages/messages.controller';

@Module({
  controllers: [MessagesController],
})
export class MessagesModule {}
