import { Test, TestingModule } from '@nestjs/testing';
import { UrlController } from './url.controller';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UrlService } from './url.service';
import { AppModule } from '../app.module';

//define test cases
describe('UrlController', () => {
  let app: INestApplication;

  let urlService: UrlService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    urlService = moduleRef.get<UrlService>(UrlService);
    await app.init();
  });

  beforeEach(() => {
    urlService.resetMap();
  });

  describe('/encode', () => {
    it('should return a short URL when a long URL is encoded', async () => {
      const response = await request(app.getHttpServer())
        .post('/encode')
        .send({ url: 'https://indicina.co/1' })
        .expect(201);

      expect(response.body.shortUrl).toBeDefined();
    });
  });

  describe('/decode', () => {
    it('should return the original URL when a short URL is decoded', async () => {
      const encodedResponse = await request(app.getHttpServer())
        .post('/encode')
        .send({ url: 'https://indicina.co/2' });

      const response = await request(app.getHttpServer())
        .post('/decode')
        .send({ shortUrl: encodedResponse.body.shortUrl })
        .expect(201);

      expect(response.body.url).toEqual('https://indicina.co/2');
    });
  });

  // describe('/statistic/:urlPath', () => {
  //   it('should return the number of clicks for a short URL', async () => {
  //     const encodedResponse = await request(app.getHttpServer())
  //       .post('/encode')
  //       .send({ url: 'https://indicina.co' });
  //     await request(app.getHttpServer())
  //       .get(`/${encodedResponse.body.shortUrl}`)
  //       .expect(301);
  //     await request(app.getHttpServer())
  //       .get(`/${encodedResponse.body.shortUrl}`)
  //       .expect(301);

  //     const response = await request(app.getHttpServer())
  //       .get(`/statistic/${encodedResponse.body.shortUrl}`)
  //       .expect(200);

  //     expect(response.body.clicks).toEqual(2);
  //   });
  // });

  // describe('/:urlPath', () => {
  //   it('should redirect to the original URL', async () => {
  //     const encodedResponse = await request(app.getHttpServer())
  //       .post('/encode')
  //       .send({ url: 'https://indicina.co' });

  //     const response = await request(app.getHttpServer()).get(
  //       `/${encodedResponse.body.shortUrl}`,
  //     );
  //     .expect(301);

  //     expect(response.header.location).toEqual('https://indicina.co');
  //   });

  //   it('should return 404 when the short URL is not found', async () => {
  //     await request(app.getHttpServer()).get('/123').expect(404);
  //   });
  // });

  afterAll(async () => {
    await app.close();
  });
});
