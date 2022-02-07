
install:
	docker compose run node npm install
	docker compose run python pip install pymlask --user

start:
	docker compose run --service-ports node npm start 

test:
	docker compose run node npm test

check:
	docker compose run node npx eslint ./src/

update:
	docker compose run node ./src/script/retrieveTweetsCount.js
	docker compose run node node ./src/script/retrieveSearchRecent.js
	docker compose run node node ./src/script/determinePopular.js
	docker compose run node node ./src/script/SummarizeAnnotation.js
	docker compose run python python ./src/script/analyzeSentiment.py

build:
	docker compose run node npm run build
