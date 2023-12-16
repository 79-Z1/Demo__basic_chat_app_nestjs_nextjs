import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { configSwagger } from './config/api-docs.config';
 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  app.use(compression());
  configSwagger(app);
   
  await app.listen(3001);
}
bootstrap();
