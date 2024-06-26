FROM node:20

ENV HOME=/home/app
WORKDIR $HOME

COPY package.json ./
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]