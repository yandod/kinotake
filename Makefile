
install:
	docker compose run node npm install
install-python:
#	docker compose run python apk update
#	docker compose run python apk --update-cache add python3-dev gcc g++ libc-dev linux-headers
#	docker compose run python apk --update-cache add libgcc libquadmath musl libgfortran lapack-dev
#	docker compose run python apk add libmecab2 libmecab-dev mecab mecab-utils nkf
	docker compose run python pip install pymlask -t ./src/script
start:
	docker compose run --service-ports node npm start 

test:
	docker compose run node npm test

check:
	docker compose run node npx eslint ./src/

update:
	docker compose run node ./src/retrieveData.js

build:
	docker compose run node npm run build
#history
#docker compose run node npx create-react-app --template typescript app
#docker compose run node npm install react-number-format --save
#docker compose run node npm i --save @devexpress/dx-react-core @devexpress/dx-react-chart
#docker compose run node npm i --save @devexpress/dx-react-chart-material-ui
#docker compose run node npm install needle --save
#docker compose run node npm install apexcharts --save