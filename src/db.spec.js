import mongoose from 'mongoose'
import * as DB from './db'
import chai from 'chai';

const should = chai.should();


describe('Test Database', () => {
    before(function(done) {
        DB.connectTEST(done)
    })

    it('connection', () => {
        var db = DB.getDB()
        expect(db).to.be.ok
    })

    it('getResources', (done) => {
        DB.getResources().exec(function(err,result){
            if(err)
               return console.log(err);               
            expect(result).to.be.ok
            done()
         });
    })

})    