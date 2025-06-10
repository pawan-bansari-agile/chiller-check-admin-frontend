FROM node:18.18.2-alpine
WORKDIR /usr/src/app
 
COPY package*.json /usr/src/app/
RUN npm install --force
# RUN npm install --legacy-peer-deps
 
COPY . .
 
RUN npm run build
RUN npm install -g serve
 
CMD ["serve", "-s", "build"]
 
EXPOSE 3000