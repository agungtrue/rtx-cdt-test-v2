import assert from 'assert';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);

describe('Health Check', function () {
    it('should return status code 200', async function () {
        const res = await chai.request(app).get('/');
        expect(res).to.have.status(200);
    });
});