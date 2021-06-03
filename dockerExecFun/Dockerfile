FROM node:14
LABEL version="0.1" maintener="Lotiko <laurentd@netc.fr>"
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package.json ./

COPY . .
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source

EXPOSE 2323
USER node:node
ENTRYPOINT  node app.js