# Use official Node.js image as base
FROM node:20.12.1

RUN apt-get update

# Install nodemon globally
RUN yarn global add nodemon
# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
RUN yarn install

# Copy application code
COPY . .

# Create directory for logs
RUN mkdir -p logs/
RUN mkdir -p build
# Change ownership of the logs directory to non-root user
RUN chown -R node:node logs/
RUN chown -R node:node build/

# Switch to non-root user
USER node


# Define the command to start the application
CMD [ "yarn", "start" ]

