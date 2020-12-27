FROM node
WORKDIR /app/client
COPY ./package.json .
RUN yarn --silent
RUN yarn install
COPY . .
CMD ["yarn","start-prod"]
EXPOSE 5000