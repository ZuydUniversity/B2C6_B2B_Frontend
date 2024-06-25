# syntax=docker/dockerfile:1.4
#
# For building React app
FROM node:lts AS build

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json (if available)
COPY package.json /frontend/package.json
COPY package-lock.json /frontend/package-lock.json

# Install dependencies
RUN npm install

# Copy all files to the container
COPY . /frontend

# Build the React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Copy the build output to the serve stage
COPY --from=build /frontend/build /frontend/build

WORKDIR /frontend/build

CMD ["serve", "-s", ".", "-l", "8080", "-p", "0.0.0.0"]