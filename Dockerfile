FROM node:18.8.0-alpine
WORKDIR /frontend
COPY . .

RUN npm install
CMD ["npm", "start"]
EXPOSE 3000