FROM node:18.8.0-alpine
WORKDIR /frontend
COPY . .
CMD ["npm", "start"]
EXPOSE 3000