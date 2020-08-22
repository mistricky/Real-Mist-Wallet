# install stage
FROM node as install_pkg

LABEL maintainer=Mist

WORKDIR /opt/mist_wallet

COPY ./yarn.lock ./
# COPY ./client/yarn.lock ./client/
# COPY ./server/yarn.lock ./server/

COPY ./client/package.json ./client/
COPY ./server/package.json ./server/
COPY ./package.json ./

RUN yarn install

# build client
FROM node as client_builder

WORKDIR /opt/mist_wallet

COPY . .
COPY --from=install_pkg /opt/mist_wallet/node_modules ./node_modules

WORKDIR /opt/mist_wallet/client

COPY --from=install_pkg /opt/mist_wallet/client/node_modules ./node_modules

RUN yarn build

# start server
FROM node

WORKDIR /opt/mist_wallet

COPY . .
COPY ./docker/wait /wait

RUN chmod 777 /wait

COPY --from=install_pkg /opt/mist_wallet/node_modules ./node_modules

WORKDIR /opt/mist_wallet/server

COPY --from=install_pkg /opt/mist_wallet/server/node_modules ./node_modules
COPY --from=client_builder /opt/mist_wallet/client/public ./public

RUN npx tsc

CMD /wait && yarn start

