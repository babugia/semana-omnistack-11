const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new ong', async () => {
    const response = await request(app)
      .post('/ongs')
      // .set('Authorization', '027b24f6') to set a Header
      .send({
        name: 'APAD3',
        email: 'guibbg@gmail.com',
        whatsapp: '1994737495',
        city: 'Mococa',
        uf: 'SP'
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
