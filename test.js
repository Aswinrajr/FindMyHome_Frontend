
// # FROM node:alpine3.18 as build


// # ARG VITE_APP_NODE_ENV
// # ARG VITE_SERVER_URL_ROUTE
// # ARG VITE_SERVER_ADMIN_ROUTE
// # ARG VITE_SERVER_PROVIDER_ROUTE


// # ENV VITE_APP_NODE_ENV =$VITE_APP_NODE_ENV
// # ENV VITE_SERVER_URL_ROUTE=$VITE_SERVER_URL_ROUTE
// # ENV VITE_SERVER_ADMIN_ROUTE = $VITE_SERVER_ADMIN_ROUTE
// # ENV VITE_SERVER_PROVIDER_ROUTE=$VITE_SERVER_PROVIDER_ROUTE


// # WORKDIR /app


// # COPY package.json package-lock.json ./


// # RUN npm install


// # COPY . .


// # RUN npm run build

// # FROM nginx:1.23-alpine


// # WORKDIR /usr/share/nginx/html


// # RUN rm -rf ./*


// # COPY --from=build /app/dist .


// # EXPOSE 80


// # ENTRYPOINT ["nginx", "-g", "daemon off;"]


// # name: Deploy React Application

// # on:
// #   push:
// #     branches:
// #       - master

// # jobs:
// #   build:
// #     runs-on: ubuntu-latest

// #     steps:
// #       - name: Checkout Source
// #         uses: actions/checkout@v2

// #       - name: Set up Docker Buildx
// #         uses: docker/setup-buildx-action@v1

// #       - name: Log in to Docker Hub
// #         uses: docker/login-action@v2
// #         with:
// #           username: ${{ secrets.DOCKER_USERNAME }}
// #           password: ${{ secrets.DOCKER_PASSWORD }}

// #       - name: Build and push Docker image
// #         uses: docker/build-push-action@v2
// #         with:
// #           context: .
// #           push: true
// #           tags: ${{ secrets.DOCKER_USERNAME }}/react_app:latest
// #           build-args: |
// #             VITE_APP_NODE_ENV=production
// #             VITE_SERVER_URL_ROUTE=${{ secrets.VITE_SERVER_URL_ROUTE }}
// #             VITE_SERVER_ADMIN_ROUTE=${{ secrets.VITE_SERVER_ADMIN_ROUTE }}
// #             VITE_SERVER_PROVIDER_ROUTE=${{ secrets.VITE_SERVER_PROVIDER_ROUTE }}

// #   deploy:
// #     needs: build
// #     runs-on: self-hosted

// #     steps:
// #       - name: Pull image from Docker Hub
// #         run: docker pull ${{ secrets.DOCKER_USERNAME }}/react_app:latest

// #       - name: Stop and remove old container
// #         run: |
// #           docker rm -f react_app || true
          

// #       - name: Run Docker Container
// #         run: |
// #           docker run -d -p 5173:80 --name react_app ${{ secrets.DOCKER_USERNAME }}/react_app:latest 
  
