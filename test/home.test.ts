import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App'

chai.use(chaiHttp);
const expect = chai.expect;

describe('baseRoute', () => {
    it('should be json', () => {
        return chai.request(app).get('/')
        .then(res => {
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.type).to.equal('application/json');
        });
    });

    it('should have message Home', () => {
        return chai.request(app).get('/')
        .then(res => {
            expect(res.body.message).to.eql('Home');
        });
    });
});