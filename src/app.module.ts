import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlController } from './url/url.controller';
import { UrlService } from './url/url.service';

@Module({
  imports: [],
  controllers: [AppController, UrlController],
  providers: [AppService, UrlService],
})
export class AppModule {}
