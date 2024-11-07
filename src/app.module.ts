import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';

@Module({
  imports: [UrlShortenerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
