import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users.module';
import { UserEntity } from './interfaces/userEntity';
import { UsersController } from './users.controller';

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

  describe('Create User,get, update, delete user by username', () => {
    it(`/POST user, throw an errror when username is not valid`, () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          username: 'thaiyyyyyyyyyyyyyyyyyyyyyyyyyy',
          password: '1234567'
        })
        .expect(400);
    });

    it(`/POST user, throw an errror when password is not valid`, () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({
          username: 'thaingo',
          password: '12345'
        })
        .expect(400);
    });
    it('/POST user, /GET user/:username, /PUT user/:username, /Delete user/:username',async () => {
      const mockUserToAdd = {
        username: 'thaingo',
        password: '1234567'
      };
      const newUser = new UserEntity();
      const data = await request(app.getHttpServer())
        .post('/user')
        .send(mockUserToAdd)
        .expect(201);
        expect(data.body).toEqual({
          ...newUser,
          ...mockUserToAdd,
        });
        //Update user by username
        const updateUser = await request(app.getHttpServer())
          .put(`/user/${data.body.username}`)
          .send({
            firstName: 'Ngo',
            lastName: 'Thai'
          })
          .expect(200);
          expect(updateUser.body).toEqual({
            ...data.body,
            ...updateUser.body
          });
        //Get user by username
        const getUser = await request(app.getHttpServer())
          .get(`/user/${data.body.username}`)
          .expect(200)
          expect(getUser.body).toEqual(data.body);

        //Delete user by username
        return await request(app.getHttpServer())
          .delete(`/user/${data.body.username}`)
          .expect(200);
    });
  });

  it('/GET user/id/:id', () => {
    return request(app.getHttpServer())
    .get('/user/id/0')
    .expect(200);
  })

  afterAll(async () => {
    await app.close();
  });
});
