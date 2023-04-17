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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiProperty,
} from '@nestjs/swagger';

class EncodeDto {
  @ApiProperty()
  url: string;
}
class DecodeDto {
  @ApiProperty()
  shortUrl: string;
}

@ApiTags('urls')
@Catch(NotFoundException, BadRequestException)
@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiOperation({ summary: 'Encodes a URL to a shortened URL' })
  @ApiBody({ description: 'Encode url', type: EncodeDto })
  @ApiResponse({
    status: 201,
    description: 'The shortened URL has been successfully created',
  })
  @Post('encode')
  encodeUrl(@Body('url') url: string): { shortUrl: string } {
    if (!url) {
      throw new BadRequestException('Invalid request body');
    }

    const shortUrl = this.urlService.encode(url);
    return { shortUrl };
  }

  @ApiOperation({ summary: 'Decodes a shortened URL to its original URL' })
  @ApiBody({ description: 'Decode url', type: DecodeDto })
  @ApiResponse({
    status: 200,
    description: 'The original URL has been successfully retrieved',
  })
  @ApiResponse({ status: 404, description: 'The short URL does not exist' })
  @Post('decode')
  decodeUrl(@Body('shortUrl') shortUrl: string): { url: string } {
    if (!shortUrl) {
      throw new BadRequestException('Invalid request body');
    }

    const url = this.urlService.decode(shortUrl);
    return { url };
  }

  @ApiOperation({ summary: 'Returns basic stats of a short URL' })
  @ApiResponse({
    status: 200,
    description: 'The stats of the short URL have been successfully retrieved',
  })
  @ApiResponse({ status: 404, description: 'The short URL does not exist' })
  @Get('statistic/:urlPath')
  getStats(@Param('urlPath') urlPath: string): any {
    if (!urlPath) {
      throw new BadRequestException('Invalid URL path parameter');
    }

    const stats = this.urlService.getStats(urlPath);
    return stats;
  }

  @ApiOperation({ summary: 'Redirects to the original URL' })
  @ApiResponse({
    status: 301,
    description: 'The request has been successfully redirected',
  })
  @ApiResponse({ status: 404, description: 'The short URL does not exist' })
  @Get('/:urlPath')
  @HttpCode(301)
  redirectUrl(@Param('urlPath') urlPath: string, @Res() res: Response): any {
    if (!urlPath) {
      throw new Error('Invalid URL path parameter');
    }

    const originalUrl = this.urlService.getUrl(urlPath);
    if (originalUrl) {
      this.urlService.addClick(urlPath);

      return res.redirect(301, originalUrl);
    }
    throw new NotFoundException('url not found');
  }

  // This method will handle NotFoundException thrown in the above endpoint method
  @HttpCode(404)
  catchNotFoundException() {
    return { error: 'Resource not found' };
  }
}
