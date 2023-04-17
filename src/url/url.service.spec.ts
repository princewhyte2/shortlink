import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';

describe('UrlService', () => {
  let service: UrlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlService],
    }).compile();

    service = module.get<UrlService>(UrlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('encodeUrl', () => {
    it('should encode a URL and return a short URL', () => {
      const longUrl = 'https://example.com';
      const shortUrl = service.encode(longUrl);
      expect(shortUrl).toBeDefined();
      expect(shortUrl).not.toBe(longUrl);
    });

    it('should throw an error when called with an empty URL', () => {
      const longUrl = '';
      expect(() => service.encode(longUrl)).toThrow();
    });
  });

  describe('getUrl', () => {
    it('should return the original URL for a valid short URL', () => {
      const longUrl = 'https://example.com';
      const shortUrl = service.encode(longUrl);
      const result = service.decode(shortUrl);
      expect(result).toBe(longUrl);
    });
  });

  describe('addClick', () => {
    it('should increment the click count for a valid short URL', () => {
      const longUrl = 'https://example.com';
      const shortUrl = service.encode(longUrl);
      service.addClick(shortUrl);
      const clicks = service.getStats(shortUrl).clicks;
      expect(clicks).toBe(1);
    });
  });

  describe('getStats', () => {
    it('should return the click count for a valid short URL', () => {
      const longUrl = 'https://example.com';
      const shortUrl = service.encode(longUrl);
      service.addClick(shortUrl);
      const clicks = service.getStats(shortUrl).clicks;
      expect(clicks).toBe(1);
    });

    it('should return 0 for a valid short URL with no clicks', () => {
      const longUrl = 'https://example.com';
      const shortUrl = service.encode(longUrl);
      const clicks = service.getStats(shortUrl).clicks;
      expect(clicks).toBe(0);
    });
  });
});
