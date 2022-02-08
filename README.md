# kinotake
"Kinoko no yama"(きのこの山) or "Takenoko no sato"(たけのこの里) on social media?

- [demo site](https://yandod.github.io/kinotake/)

# Prerequisites 
- Twitter API Essential Access
- A Project and an App created in the dashboard
- docker (tested on version 20.10.12)
- Make (tested on GNU Make 3.81) *optional
- replace `<your_bearer_token>` with your own bearer token without the `<` `>`. in `docker-compose.yml`
```
    environment:
      - BEARER_TOKEN=<your_bearer_token>
```
- this app will consume 200 tweets from monthly tweet cap per backend script run.
  - tested with Elevated accesss

# Usage

Makefile provide simple entry point to run tasks on docker containers.

## setup

pull containers [node and python] image and install depedency.

```sh
make install
```
## run backend scripts

Hitting Twitter API and update local json files. This operation consume monthly tweet cap.

```sh
make update
```

## run app on local machine

Serve static site based on local json files produced on previous step.
local dev server listen port 3000 by default. if this port is occupied by other service, tweak setting on `docker-compose.yml`

```sh
make start
```

## access to app

navigate to url to see generated website.

```sh
http://localhost:3000
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
## access to app

navigate to url to see generated website.

```sh
http://localhost:3000
```
