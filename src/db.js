import mongoose from 'mongoose'
import * as db from './models'

//connect to mogodb
mongoose.Promise = require('bluebird');

const url = require('./config.json').connectionString;


var state = {
    db: null
}
export const connectDb = () => {
    if (state.db) return;
    
    mongoose.connect(url, {
        useMongoClient: true
      }, 
      function(err, db) {
        if (err) return;
        state.db = db
    })
}

export const connectTEST = function(done) {
    if (state.db) return done()
    
    mongoose.connect(url, {
        useMongoClient: true
      }, 
      function(err, db) {
        if (err) return done(err)
        state.db = db
        done()
    })
}
  

export const getDB = function() {
    return state.db
}

//Resources collections
export const getResources = (filter = {}) =>{
    return db.resourcesCollection
    .find(filter)
}

export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	connectDb();
	callback();
}