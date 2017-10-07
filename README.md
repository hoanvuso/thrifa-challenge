# Thrifa Challenge

## Requirenment Server: Ubuntu 14.04

## Install Environments

### Install NodeJS

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install nodejs
npm install -g pm2
```

### Install MongoDB

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
service mongod status
```

### Clone Source Code

```
cd /var/www
git clone https://github.com/hoanvuso/thrifa-challenge.git thrifa-challenge
```

### Build APP

```
cd /var/www/thrifa-challenge
NODE_ENV=development npm install
PORT=8001 npm run bs
```

### Run APP

```
pm2 delete thrifa-challenge
PORT=8001 NODE_ENV=production pm2 start index.js -n thrifa-challenge -i 1
```

Run on browser: http://<IP>:8001/
