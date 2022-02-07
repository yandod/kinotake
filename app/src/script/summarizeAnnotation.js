// process search result from json to summarize annotaions for entry
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
    let result = {};
    data.data.forEach((node) => {
        if ( !('context_annotations' in node) ) {
            return;
        }
        node.context_annotations.forEach((context) => {
            // skip vertical
            if (context.domain.name.includes(' Vertical')) {
                return;
            }
            // skip category
            if (context.domain.name.includes(' Category')) {
                return;
            }
            if (context.entity.name in result) {
                result[context.entity.name] += 1;
            } else {
                result[context.entity.name] = 1;
            }
        });
    });

    console.log(result);

    fs.writeFileSync(`./src/data/${target.id}Annotation.json`, JSON.stringify(result));
}