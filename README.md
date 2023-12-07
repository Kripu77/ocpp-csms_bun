# ocpp-csms_bun
OCPP central management system with native bun.sh webSockets.

## Table of contents
* [General info](#general-info)
* [Installation](#installation)
* [Usage without docker](#usage-without-docker)
* [Usage with docker](#usage-with-docker)
* [Usage with docker swarm](#usage-with-docker-swarm)
* [License](#license)


## General info
This project is a simple OCPP central management system with native bun.sh webSockets. 

## Installation
```bash
git clone git@github.com:Kripu77/ocpp-csms_bun.git
cd ocpp-csms_bun
bun install
```

## Usage without docker
```bash
bun start
```

## Usage with docker
```bash
docker-compose up -d
```

## Usage with docker swarm
```bash
docker stack deploy -c docker-compose.yml ocpp-csms_bun
```



## License
[MIT](https://choosealicense.com/licenses/mit/)


