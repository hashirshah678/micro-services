# Step 1: Use an official Node.js base image
FROM node:alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the project files
COPY . .

# Step 6: Expose the port your app runs on (e.g., 3000)
EXPOSE 3000

# Step 7: Command to run the app
CMD ["npm", "start"]
