# Stage 1: Build the NestJS application
FROM node:17 AS builder

# Set the working directory in the builder stage
WORKDIR /app

# Copy package.json and package-lock.json to the builder stage
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the builder stage
COPY . .

# Build the NestJS application for production
RUN npm run build


# Stage 2: Create the production image
FROM node:17

# Set the working directory in the production stage
WORKDIR /app

# Copy the built application from the builder stage to the production stage
COPY --from=builder /app/dist ./dist
COPY package*.json ./

# Install only production dependencies (skip development dependencies)
RUN npm install --production

# Define an environment variable for the port (default to 3000 if not provided)
ENV PORT=3000

# Expose the port specified in the environment variable
EXPOSE $PORT

# Define the command to start the production server
CMD ["node", "dist/main.js"]