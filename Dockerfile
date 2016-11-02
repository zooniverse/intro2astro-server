FROM node:argon
WORKDIR /app
COPY . .

RUN rm -rf node_modules
# TODO change to use yarn
RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

