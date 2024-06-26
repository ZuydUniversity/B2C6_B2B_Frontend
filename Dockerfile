FROM node:lts AS build

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json (if available)
COPY frontend/package.json /frontend/package.json

RUN npm install

# Copy all files to the container
COPY frontend /frontend

# Build the React app
RUN npm run build

# Use a smaller image for serving the app
FROM node:lts-slim AS serve

# Install serve globally
RUN npm install -g serve

# Copy the build output to the serve stage
COPY --from=build /frontend/build /frontend/build

WORKDIR /frontend/build

# Set the command to serve the app
CMD ["serve", "-s", ".", "-l", "tcp://0.0.0.0:8080"]