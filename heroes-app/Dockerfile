FROM node:14 as build-step

WORKDIR /heroes-app

COPY . .

RUN npm i && npm run build

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# ADD ./config/default.conf /usr/share/nginx/conf.d/default.conf

COPY --from=build-step /heroes-app/dist/heroes-app .

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]