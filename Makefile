
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
	docker compose run python python ./src/script/analyzeSentiment.py

build:
	docker compose run node npm run build

#history
#docker compose run node npx create-react-app --template typescript app
#docker compose run node npm install react-number-format --save
#docker compose run node npm i --save @devexpress/dx-react-core @devexpress/dx-react-chart
#docker compose run node npm i --save @devexpress/dx-react-chart-material-ui
#docker compose run node npm install needle --save
#docker compose run node npm install apexcharts --save