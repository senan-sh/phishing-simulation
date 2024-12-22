// src/phishing/phishing-simulation.controller.ts

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SimulationService } from './phishing.service';
import { SendEmailDto } from './dto/send-email.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@ApiTags('Phishing Simulation')
@Controller('phishing')
export class PhishingSimulationController {
  constructor(private simulationService: SimulationService) {}

  @Post('send')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Send a phishing email simulation' })
  @ApiResponse({
    status: 201,
    description: 'Phishing email sent successfully',
    schema: {
      example: { message: 'Phishing email sent successfully' },
    },
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiInternalServerErrorResponse({
    description: 'Failed to send phishing email',
  })
  async sendEmail(
    @Body() sendEmailDto: SendEmailDto,
  ): Promise<{ message: string }> {
    return this.simulationService.sendPhishingEmail(sendEmailDto);
  }
}
