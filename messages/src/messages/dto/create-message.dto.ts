import { IsString } from 'class-validator';

export class CreateMessageDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  content: string;
}
