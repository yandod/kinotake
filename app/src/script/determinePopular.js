// process search result from json to narrow down popular entities by likes
//

const fs = require('fs');

const targets = [
    { id: 'kinoko', path: './src/data/kinokoRecentSearch.json' },
    { id: 'takenoko', path: './src/data/takenokoRecentSearch.json' },
];


targets.map(findPopular);
function findPopular (target){
    const fileContents = fs.readFileSync(target.path, 'utf8');
    const data = JSON.parse(fileContents);

    let result = data.data;
    result.sort(function(a,b){
        if(a.public_metrics.like_count > b.public_metrics.like_count) return -1;
        if(a.public_metrics.like_count < b.public_metrics.like_count) return 1;
        return 0;
    })

    result = result.slice(0, 5);
    console.log(result.slice(0, 3));

    fs.writeFileSync(`./src/data/${target.id}Popular.json`, JSON.stringify(result));
}