FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/apartment-manager/api .
ENV PORT=3332
EXPOSE ${PORT}
RUN npm install --production
CMD node ./main.js
