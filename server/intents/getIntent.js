'use strict';

const request = require('superagent');

module.exports.process = function process(intentData, cb) {
    if(intentData.intent[0].value != 'get') {
        return cb(new Error(`Expected suggest intent, got ${intentData.intent[0].value}`));
    }
/*
    if(!intentData.location) {
        return cb(new Error(`Missing location in time intent`));
    }
*/
    var name = intentData.name[0].value;
    // encodeURI
    // decodeURI
    // what is the incpetion movie?
    // https://www.gender-api.com/get?name=Diana&key=sUWXJGlJKNJMwWXRnA
 var urlGet = "https://www.gender-api.com/get?name="+ name +"&key=sUWXJGlJKNJMwWXRnA";

    request.get(urlGet, (err, res) => {
        if(err || res.statusCode != 200 || !res.body.result) {
            console.log(err);
            console.log(res.body);

            //return cb(false, `I had a problem find out the time in ${location}`);
        }
        var gender = res.body;
            var info = `The Gender is: ${gender.gender}`;
            return cb(false, info);
    });
}

/*
https://slack-project.slack.com/messages/@mediabot/team/mediabot/
*/