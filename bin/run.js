'use strict'

const slackClient = require("../server/slackClient");
const service = require("../server/service");
const http = require("http");
const server = http.createServer(service);

const witToken = 'IYJCIOJ67EJEUA75XMCDKEYYKQQ75E5H'
const witClient = require('../server/witClient')(witToken);

const slackToken = 'xoxb-113565100930-uOdG3OlMTC4JZXYHJovshYJa';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(4000));

server.on('listening', function() {
    console.log(`Genderbot is listening on ${server.address().port} in ${service.get('env')} mode. `);
});

/*
https://slack-project.slack.com/messages/@mediabot/
https://wit.ai/bhaveshgangani/mediabot/settings
https://api.slack.com/apps/A39NPLDDF
https://slack-project.slack.com/services/B3AB6PDB5
*/