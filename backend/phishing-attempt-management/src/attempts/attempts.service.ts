import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import {
  PhishingAttempt,
  PhishingAttemptStatus,
} from './schemas/phishing-attempts.schema';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { CreateAttemptDto } from './dto/create-attempt.dto';

@Injectable()
export class AttemptsService {
  constructor(
    private httpService: HttpService,
    private jwtService: JwtService,
    @InjectModel(PhishingAttempt.name)
    private attemptModel: Model<PhishingAttempt>,
  ) {}
  async findPaginated(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [results, total] = await Promise.all([
      this.attemptModel.find().skip(skip).limit(limit).exec(),
      this.attemptModel.countDocuments().exec(),
    ]);
    const totalPages = Math.ceil(total / limit);
    return {
      data: results,
      totalElements: total,
      totalPages,
    };
  }
  async findAll() {
    return this.attemptModel.find().exec();
  }

  async createAndSend({ email, emailContent, subject }: CreateAttemptDto) {
    const attempt = await this.attemptModel.create({
      email,
      emailContent,
      status: PhishingAttemptStatus.Pending,
      createdAt: new Date(),
    });
    try {
      const requestBody = {
        email,
        attemptId: attempt._id,
        subject,
        // TODO: Maybe implement more dynamic html handling {front-end}
        html: `
          <p>${emailContent}</p>
          <p>Click <a href="${process.env.PHISHING_LINK}${attempt._id}" target="_blank">here</a> to test your awareness.</p>
        `,
      };
      await firstValueFrom(
        this.httpService.post(process.env.SEND_EMAIL_URI, requestBody),
      );

      return { message: 'Phishing email sent successfully', attempt };
    } catch {
      throw new HttpException(
        'Failed to create and send phishing attempt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStatus(id: string, status: string) {
    const validStatuses = [
      PhishingAttemptStatus.Clicked,
      PhishingAttemptStatus.Pending,
    ];
    if (!validStatuses.includes(status as PhishingAttemptStatus)) {
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
    }

    const updatedAttempt = await this.attemptModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedAttempt) {
      throw new HttpException(
        'Phishing attempt not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return updatedAttempt;
  }
}
