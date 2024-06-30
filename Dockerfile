# syntax=docker/dockerfile:1.4
#
# For building React app
FROM node:lts AS build

# Set working directory
WORKDIR /frontend

COPY /frontend/package.json /frontend/package.json
# COPY package-lock.json /frontend/package-lock.json // NIET NODIG VOOR PACKAGES 

RUN npm install

# Copy all files to the container
COPY /frontend /frontend

RUN npm run build

# Install serve for serving React Build
RUN npm install -g serve

# Copy the build output to the serve stage
COPY --from=build /frontend/build /frontend/build

# WORKDIR /frontend/build

CMD ["serve", "-s", "/frontend/build", "-l", "8080", "-p", "0.0.0.0"]