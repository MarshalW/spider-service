# https://medium.com/@allanlei/running-cron-in-docker-the-easy-way-4f779bfa9ca7
FROM        marshalw/simple-spider

# RUN apk add tzdata

COPY        entrypoint.sh /
RUN         chmod +x /entrypoint.sh
ENTRYPOINT  ["/entrypoint.sh"]

WORKDIR /app
COPY package*.json ./
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install

COPY ./app.js ./
COPY ./lib ./lib
COPY ./config ./config

COPY ./spider.sh /app/spider.sh
RUN  chmod +x /app/spider.sh