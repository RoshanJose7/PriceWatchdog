FROM node
WORKDIR /app/server
COPY ./package.json .
RUN yarn --silent
RUN yarn install
COPY . .
CMD ["yarn","start"]
EXPOSE 8000