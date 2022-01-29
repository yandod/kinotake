// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require('needle');
const fs = require('fs');
const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/counts/recent";

const targets = [
    {id:'kinoko', keyword:'きのこの山'},
    {id:'takenoko', keyword:'たけのこの里'},
    {id:'emacs', keyword:'emacs'},
    {id:'vim', keyword:'vim'},
]

async function getRequest(target) {

    const {id, keyword} = target;
    const params = {
        'query': `${keyword} lang:ja`,
        'granularity': 'day'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentTweetCountsJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body && res.statusCode === 200) {
        return res.body;
    } else {
        throw new Error(`Unsuccessful request on ${id}:` + res.body);
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