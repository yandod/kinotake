// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require('needle');
const fs = require('fs');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/counts/recent";

const targets = [
    {id:'kinoko', keyword:'きのこの山'},
    {id:'takenoko', keyword:'たけのこの里'},
    {id:'emacs', keyword:'emacs'},
    {id:'vimm', keyword:'vimm'},
]

async function getRequest(target) {

    // Edit query parameters below and specify a search query
    // optional params: start_time,end_time,since_id,until_id,next_token,granularity
    const {id, keyword} = target;
    const params = {
        'query': `${keyword} lang:ja`,
        'granularity': 'day'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentTweetCountsJS",
            "authorization": `Bearer ${token}`
        },
        //output: `${id}.json`
    })

    if (res.body) {
        //fs.writeFileSync(`${id}.json`, res.body);
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {

    try {
        // Make request
        targets.map( async (target) => {
            const response = await getRequest(target);
            console.dir(response, {
                depth: null
            });
            console.log(response);
            fs.writeFileSync(`./src/data/${target.id}.json`, JSON.stringify(response));
        })


    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    //process.exit();
})();