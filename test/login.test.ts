import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App'

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('POST api/session', () => {
    it('should be json', () => {
        return chai.request(app)
        .post('/api/session')
        .send({
            "user_name": "admin",
            "password": "admin"
        })
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
        });
    });

    it('should return error message because its missing password', () => {
        return chai.request(app)
        .post('/api/session')
        .send({
            "user_name": "admin"
        })
        .then(res => {
            expect(res.status).to.equal(400);
        });
    });
});