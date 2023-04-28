import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigInit } from './configs/swagger.config';
import { NestExpressApplication } from "@nestjs/platform-express"
import { config } from 'dotenv';
config();
async function bootstrap() {
  const {PORT} = process.env;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  SwaggerConfigInit(app)

  await app.listen(+PORT, () => {
    console.log(`http://localhost:${PORT}`);
    
  });
}
bootstrap();
 