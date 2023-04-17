import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlController } from './url/url.controller';

@Module({
  imports: [],
  controllers: [AppController, UrlController],
  providers: [AppService],
})
export class AppModule {}
