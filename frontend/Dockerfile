FROM node:22-alpine3.19
WORKDIR /frontend/

COPY public/ /frontend/public
COPY src/ /frontend/src
COPY package.json /frontend/package.json

RUN npm install
CMD ["npm", "start"]