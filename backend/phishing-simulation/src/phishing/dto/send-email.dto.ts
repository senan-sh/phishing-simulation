import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description: 'Unique identifier for the phishing attempt',
    example: '60d21b4667d0d8992e610c85',
  })
  @IsString()
  @IsNotEmpty()
  attemptId: string;
  @ApiProperty({
    description: 'HTML content',
    example: '<p>Text</p>>',
  })
  html: string;
  @ApiProperty({
    description: 'Subject for email',
    example: 'Phishing test',
  })
  subject: string;
}
