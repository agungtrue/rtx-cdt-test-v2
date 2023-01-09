import assert from 'assert';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';

chai.use(chaiHttp);
let _id = 0; // new id for add, update and delete

describe('api/property', function () {
    it('should return list of property with status code 200', async function () {
        try {
            const res = await chai.request(app).get('/api/property');
            expect(res).to.have.status(200);
            expect(res).to.have.property('body');
            expect(res).to.be.json;
            expect(res.body.data).to.be.an('array');
        } catch (err) {
            console.log({ error: err.message});
            expect(err).to.be.null;
        }
    });
});

describe('add api/property', function () {
    it('should return new data of property', async function () {
        try {
            const res = await chai.request(app).post('/api/property').send(
                { "appCode": "", "locale": "en-US", "propertyCode": "R32M", "name": "Crowne Plaza Perthjdkdkd", "starRating": 4 }
            );
            console.log('___add data', JSON.stringify(res.body))
            expect(res).to.have.status(201);
            expect(res).to.have.property('body');
            expect(res).to.be.json;
            expect(res.body.data).to.be.an('object');
            _id = res.body?.data?.id || null;
            console.info('new property id', { _id });
        } catch (err) {
            console.log({ error: err.message});
            expect(err).to.be.null;
        }
    });
});

describe('update api/property', function () {
    it('should return updated data of property', async function () {
        try {
            console.info('property id', { _id });
            const payloadUpdate = {
                location: JSON.stringify({
                    "address": "176 Adelaide Terrace updated from test driven",
                    "city": "East Perth", "country": "AU", "countryCode": "AU", "postalCode": "6004", "stateProvince": "",
                    "latLng": { "lat": -31.95941, "lng": 115.87067 }
                }),
                trustYou: JSON.stringify({ "score": 10, "reviewsCount": 10, "key": "pos10", "flag": 'from test driven' })
            } 
            const res = await chai.request(app).put(`/api/property/${_id}`).send(payloadUpdate);
            console.log('___update data', 'property id', { _id }, JSON.stringify(res.body))
            expect(res).to.have.status(200);
            expect(res).to.have.property('body');
            expect(res.body).to.have.property('message');
            expect(res).to.be.json;
        } catch (err) {
            console.log({ error: err.message});
            expect(err).to.be.null;
        }
    });
});

describe('update api/property', function () {
    it('should return delete data of property', async function () {
        try {
            console.info('property id', { _id });
            const res = await chai.request(app).delete(`/api/property/${_id}`);
            console.log('___delete data', 'property id', { _id }, JSON.stringify(res.body))
            expect(res).to.have.status(200);
            expect(res).to.have.property('body');
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('successfully deleted');
            expect(res).to.be.json;
        } catch (err) {
            console.log({ error: err.message});
            expect(err).to.be.null;
        }
    });
});