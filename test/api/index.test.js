const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

// Testlerin ne testi olduğunu açıklıyoruz
describe('Node Server', () => {
    // her describe içinde birden fazla it olabilir, itler içinde istediğimiz unit test yapılabilir
    it('(GET /) anasayfayı döndürür', (done) => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        })
    })
})