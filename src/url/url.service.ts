import { Injectable } from '@nestjs/common';

import * as base62 from 'base62';

@Injectable()
export class UrlService {
  private readonly BASE_URL = `http://localhost:3000`;

  private urlMap = new Map<string, string>();
  private statsMap = new Map<string, number>();

  encode(url: string): string {
    // Guard against incorrect input types
    if (!url) {
      throw new Error('Invalid input type');
    }
    // Encoding logic here
    const id = base62.encode(this.urlMap.size);
    this.urlMap.set(id, url);
    const shortUrl = `${this.BASE_URL}/${id}`;

    return shortUrl;
  }

  decode(shortUrl: string): string {
    // Guard against incorrect input types
    if (!shortUrl) {
      throw new Error('Invalid input type');
    }

    // Decoding logic here
    const id = shortUrl.replace(`${this.BASE_URL}/`, '');
    const url = this.urlMap.get(id);

    return url;
  }

  getStats(urlPath: string): any {
    // Guard against incorrect input types
    if (!urlPath) {
      throw new Error('Invalid input type');
    }

    // Get stats logic here
    // Get stats logic here
    const clicks = this.statsMap.get(urlPath) ?? 0;
    const url = this.urlMap.get(urlPath);
    return { clicks, url };
  }

  getUrl(urlPath: string): string {
    // Guard against incorrect input types
    if (!urlPath) {
      throw new Error('Invalid input type');
    }

    const longUrl = this.urlMap.get(urlPath);

    return longUrl;
  }

  addClick(urlPath: string): void {
    // Guard against incorrect input types
    if (!urlPath) {
      throw new Error('Invalid input type');
    }

    const clicks = this.statsMap.get(urlPath) || 0;
    this.statsMap.set(urlPath, clicks + 1);
  }

  getUrlMap(): Map<string, string> {
    return this.urlMap;
  }

  getStatsMap(): Map<string, number> {
    return this.statsMap;
  }

  resetMap(): void {
    this.urlMap.clear();
    this.statsMap.clear();
  }
}
