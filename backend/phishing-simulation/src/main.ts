import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // if (process.env.NODE_ENV === 'DEVELOPMENT') {
  const config = new DocumentBuilder()
    .setTitle('Phishing Attempt Management')
    .setDescription('Phishing internal service API documentation')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http' })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  // }
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
