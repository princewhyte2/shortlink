import {
  BadRequestException,
  Body,
  Catch,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlService } from './url.service';

@Catch(NotFoundException, BadRequestException)
@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('encode')
  encodeUrl(@Body('url') url: string): { shortUrl: string } {
    if (!url) {
      throw new BadRequestException('Invalid request body');
    }

    const shortUrl = this.urlService.encode(url);
    return { shortUrl };
  }

  @Post('decode')
  decodeUrl(@Body('shortUrl') shortUrl: string): { url: string } {
    if (!shortUrl) {
      throw new BadRequestException('Invalid request body');
    }

    const url = this.urlService.decode(shortUrl);
    return { url };
  }

  @Get('statistic/:urlPath')
  getStats(@Param('urlPath') urlPath: string): any {
    if (!urlPath) {
      throw new BadRequestException('Invalid URL path parameter');
    }

    const stats = this.urlService.getStats(urlPath);
    return stats;
  }

  @Get(':urlPath')
  @HttpCode(301)
  redirectUrl(@Param('urlPath') urlPath: string, @Res() res: Response): any {
    if (!urlPath) {
      throw new Error('Invalid URL path parameter');
    }

    const originalUrl = this.urlService.getUrl(urlPath);
    if (originalUrl) {
      this.urlService.addClick(urlPath);
      // return { url: originalUrl, statusCode: 301 };

      return res.redirect(301, originalUrl);
    }
    throw new NotFoundException('url not found');
    // return { url: '/', statusCode: 404 };
  }

  // This method will handle NotFoundException thrown in the above endpoint method
  @HttpCode(404)
  catchNotFoundException() {
    return { error: 'Resource not found' };
  }
}
