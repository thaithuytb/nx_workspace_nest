import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './user.module';
import { UsersController } from './user.controller';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UsersModule],
      controllers: [UsersController]
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  //------------------CREATE USER------------------//
  describe('POST /user', () => {
    it('should return a new user created', async () => {
      return await request(app.getHttpServer())
        .post('/user')
        .send({
          username: 'thai',
          password: '123456'
        })
        .expect(201);
    });
    it('should throw an error if username is invalid', async () => {
      return await request(app.getHttpServer())
        .post('/user')
        .send({
          username: 'thai111111111111111111111',
          password: '123456'
        })
        .expect(400);
    });
    it('should throw an error if password is invalid', async () => {
      return await request(app.getHttpServer())
        .post('/user')
        .send({
          username: 'thai1111',
          password: '123'
        })
        .expect(400);
    });
  });
  //------------------DELETE USER------------------//
  describe('DElETE /user', () => {
    it('should delete user', async () => {
      const data = await request(app.getHttpServer())
          .post('/user')
          .send({
            username: 'thaiV2',
            password: '123456'
          })
          .expect(201);
      return await request(app.getHttpServer())
        .delete(`/user/${data.body.username}`)
        .expect(200);
    });
    it('should throw an error if username is invalid', async () => {
      return await request(app.getHttpServer())
      .delete('/user/ThrowAnErrorIfNameInvalid')
      .expect(400);
    });
    it('should throw an error if not found username', async () => {
      return await request(app.getHttpServer())
      .delete('/user/fakeName')
      .send({
        username: 'thaiNgoMax',
        password: '1234567'
      })
      .expect(404);
    });
  });
  //------------------UPDATE USER------------------//
  describe('UPDATE /user', () => {
    it('should update user', async () => {
      const data = await request(app.getHttpServer())
          .post('/user')
          .send({
            username: 'thaiV3',
            password: '123456'
          })
          .expect(201);
      return await request(app.getHttpServer())
        .put(`/user/${data.body.username}`)
        .send({
          username: 'thaiNgo',
          password: '1234567'
        })
        .expect(200);
    });
    it('should throw an error if username is invalid', async () => {
      return await request(app.getHttpServer())
      .put('/user/ThrowAnErrorIfNameInvalid')
      .send({
        username: 'thaiNgo',
        password: '1234567'
      })
      .expect(400)
    });
    it('should throw an error if not found username', async () => {
      return await request(app.getHttpServer())
      .put('/user/fakeName')
      .send({
        username: 'thaiNgoMax',
        password: '1234567'
      })
      .expect(404)
    });
  });
  //------------------GET USER------------------//
  describe('GET /user', () => {
    it('should throw an error if dont have username and id', async () => {
      return await request(app.getHttpServer())
        .get('/user')
        .expect(400);
    });
    it('should throw an error if not found username', async () => {
      return await request(app.getHttpServer())
        .get('/user?username=thaiInvalid')
        .expect(404);
    });
    it('should throw an error if not found id', async () => {
      return await request(app.getHttpServer())
        .get('/user?id=1000000')
        .expect(404);
    });
    it('should an user', async () => {
      const data = await request(app.getHttpServer())
          .post('/user')
          .send({
            username: 'thaiV4',
            password: '123456'
          })
          .expect(201);
      return await request(app.getHttpServer())
        .get(`/user?username=${data.body.username}`)
        .expect(200);
    });
  });


  afterAll(async () => {
    await app.close();
  });
});
