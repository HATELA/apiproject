'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value != 'time') {
        return cb(new Error(`Expected timd intent, got ${intentData.intent[0].value}`));
    }

    if(!intentData.location) {
        return cb(new Error(`Missing location in time intent`));
    }

    const location = intentData.location[0].value;

    request.get(`http://localhost:4010/service/${location}`, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result) {
            console.log(err);
            console.log(res.body);

            return cb(false, `I had a problem find out the time in ${location}`);
        }

        return cb(false, `In ${location}, it is now ${res.body.result}`);
    });

}