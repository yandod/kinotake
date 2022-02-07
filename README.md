# kinotake
Kinoko or Takenoko on social media?

- [demo site](https://yandod.github.io/kinotake/)

# prerequirement 

- docker (tested on version 20.10.12)
- Make (tested on GNU Make 3.81) *optional
- valid BEARER_TOKEN set in `docker-compose.yml`
  - this app will consume 200 tweets from monthly tweet cap per backend script run.

# Usage

## setup

```sh
make install
```
## run backend scripts

This operation consume monthly tweet cap.

```sh
make update
```

## run app on local machine

local dev server listen port 3000 by default. if this port is occupied by other service, tweak setting on `docker-compose.yml`

```sh
make start
```

# Usage without Make

## setup

```sh
docker compose run node npm install
docker compose run python pip install pymlask --user
```
## run backend scripts

This operation consume monthly tweet cap.

```sh
docker compose run node ./src/script/retrieveTweetsCount.js
docker compose run node node ./src/script/retrieveSearchRecent.js
docker compose run node node ./src/script/determinePopular.js
docker compose run node node ./src/script/SummarizeAnnotation.js
docker compose run python python ./src/script/analyzeSentiment.py
```

## run app on local machine

local dev server listen port 3000 by default. if this is occupied by other service, tweak setting on `docker-compose.yml`

```sh
docker compose run --service-ports node npm start
```

