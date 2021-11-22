import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    })
  );
  app.enableCors();
  await app.listen(4001);
  Logger.log(`Thanks for using Personal Book! You're using version ${process.env.npm_package_version}`)
}
bootstrap();
