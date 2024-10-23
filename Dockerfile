FROM node:14-alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine
# node는 빌드 파일을 만들기 위해 필요하고 운영환경에선 필요하지 않기 때문에 운영 환경에서 사용할 서버로 베이스 이미지를 대체한다.
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]