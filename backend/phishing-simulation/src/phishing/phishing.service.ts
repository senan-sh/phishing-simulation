import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PhishingAttempt,
  PhishingAttemptDocument,
} from './schemas/phishing-attempts.schema';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class SimulationService {
  private transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  >;

  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingAttemptModel: Model<PhishingAttemptDocument>,
  ) {
    this.configureMailTransporter();
  }

  private configureMailTransporter() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_USER_PASSWORD,
      },
    });
  }

  private generateMailOptions(emailDto: Partial<SendEmailDto>): Mail.Options {
    return {
      from: process.env.EMAIL_USER,
      to: emailDto.email,
      subject: emailDto.subject,
      html: emailDto.html,
    };
  }

  async sendPhishingEmail(
    sendEmailDto: SendEmailDto,
  ): Promise<{ message: string }> {
    try {
      const mailOptions = this.generateMailOptions(sendEmailDto);
      await this.transporter.sendMail(mailOptions);
      return { message: 'Phishing email sent successfully' };
    } catch (error) {
      console.error('Error sending phishing email:', error);
      throw new HttpException(
        'Failed to send phishing email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
