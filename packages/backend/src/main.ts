import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser = require('cookie-parser');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    //origin: process.env.CORS_ORIGIN?.split(',').map((o) => o.trim()) ?? true,
    origin:[
      'https://academic-ddd-alexanders.vercel.app', // Tu URL de Vercel
      'https://academic-ddd-git-main-lopezalexanders-projects.vercel.app', // Tu URL de Vercel
      /\.vercel\.app$/,
      'http://localhost:3000', // Para que sigas pudiendo probar en local
    ],
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:'Content-Type, Accept, Authorization',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
