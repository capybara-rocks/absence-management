import request from 'supertest';
import jwt from 'jsonwebtoken';
import createApp from '@/api/helper/create-app';
import config from '@/api/config';
import { repositories } from '@/api/data/data-source';
import { Leave, Status } from '../entity/Leave';

jest.mock('@/api/config', () => {
  return {
    secretKey: {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    },
    expiresIn: {
      accessToken: '5m',
      refreshToken: '10d',
    },
  };
});

describe('Leaves Routes', () => {
  const app = createApp();
  const userId = 1;
  const token = jwt.sign({ sub: userId }, config.secretKey.accessToken, {
    expiresIn: config.expiresIn.accessToken,
  });

  describe('GET /leaves', () => {
    it('handles unauthorized correctly', async () => {
      const response = await request(app).get('/v1/leaves');

      expect(response.statusCode).toBe(401);
    });

    it('returns data correctly', async () => {
      const mockedData = [
        {
          id: 1,
          status: Status.Approved,
          reason: 'Lorem',
        },
      ] as Leave[];
      const spy = jest
        .spyOn(repositories.leave, 'find')
        .mockResolvedValue(mockedData);
      const response = await request(app)
        .get('/v1/leaves')
        .set({ Authorization: `Bearer ${token}` });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ where: { userId: 1 } });
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual(mockedData);
    });
  });

  describe('POST /create', () => {
    it('validates form correctly', async () => {
      const response = await request(app)
        .post('/v1/leaves')
        .set({ Authorization: `Bearer ${token}` })
        .send({});

      expect(response.statusCode).toBe(400);
    });

    it('creates leave correctly', async () => {
      const mockedData = {
        leaveDate: new Date(),
        reason: 'Lorem',
      } as Partial<Leave>;
      const spy = jest
        .spyOn(repositories.leave, 'save')
        .mockResolvedValue(mockedData as Leave);
      const response = await request(app)
        .post('/v1/leaves')
        .set({ Authorization: `Bearer ${token}` })
        .send(mockedData);

      expect(response.statusCode).toBe(201);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({
        ...mockedData,
        userId,
        leaveDate: mockedData.leaveDate.toISOString(),
      });
      expect(response.body).toStrictEqual({
        ...mockedData,
        leaveDate: mockedData.leaveDate.toISOString(),
      });
    });
  });
});
