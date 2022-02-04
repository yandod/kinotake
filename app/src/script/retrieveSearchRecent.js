// Search for Tweets within the past seven days
// https://developer.twitter.com/en/docs/twitter-api/tweets/search/quick-start/recent-search

const needle = require('needle');
const fs = require('fs');

const token = process.env.BEARER_TOKEN;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

const targets = [
    {id:'kinoko', query:'きのこの山 -たけのこの里 -is:retweet'},
    {id:'takenoko', query:'たけのこの里 -きのこの山 -is:retweet'},
]

async function getRequest(target) {

    const {id, query} = target;
    const params = {
        'query': `${query} lang:ja`,
        'tweet.fields': 'author_id,public_metrics',
        'max_results': '100'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "User-Agent": "v2RecentSearchJS",
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {

    try {
        targets.map( async (target) => {
            // Make request
            const response = await getRequest(target);
            console.dir(response, {
                depth: null
            });
            console.log(response);
            fs.writeFileSync(`./src/data/${target.id}RecentSearch.json`, JSON.stringify(response));
        })
    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
})();