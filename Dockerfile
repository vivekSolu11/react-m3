# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code to the container
COPY . .

# Define build arguments
ARG VITE_END_POINT_URL
ARG VITE_CHATBOT_END_POINT_URL
ARG VITE_SOCIAL_LOGIN_REDIRECT_URL
ARG VITE_ANALYSER_END_POINT_URL
ARG VITE_REPORT_END_POINT_URL
ARG VITE_RESUME_PARSER_END_POINT_URL
ARG VITE_CUSTOMIZE_RESUME_END_POINT_URL
ARG VITE_UPDATE_WITH_AI_END_POINT_URL
ARG VITE_CAREER_ADVISOR_END_POINT_URL
ARG VITE_CRYPTO_KEY

# Set environment variables from build arguments
ENV VITE_END_POINT_URL=$VITE_END_POINT_URL \
    VITE_CHATBOT_END_POINT_URL=$VITE_CHATBOT_END_POINT_URL \
    VITE_SOCIAL_LOGIN_REDIRECT_URL=$VITE_SOCIAL_LOGIN_REDIRECT_URL \
    VITE_ANALYSER_END_POINT_URL=$VITE_ANALYSER_END_POINT_URL \
    VITE_REPORT_END_POINT_URL=$VITE_REPORT_END_POINT_URL \
    VITE_RESUME_PARSER_END_POINT_URL=$VITE_RESUME_PARSER_END_POINT_URL \
    VITE_CUSTOMIZE_RESUME_END_POINT_URL=$VITE_CUSTOMIZE_RESUME_END_POINT_URL \
    VITE_UPDATE_WITH_AI_END_POINT_URL=$VITE_UPDATE_WITH_AI_END_POINT_URL \
    VITE_CAREER_ADVISOR_END_POINT_URL=$VITE_CAREER_ADVISOR_END_POINT_URL \
    VITE_CRYPTO_KEY=$VITE_CRYPTO_KEY \
    PORT=4173

# Build the project using Vite
RUN npm run build

# Expose the port that the application will run on
EXPOSE 4173

# Start the app using "vite preview" when the container launches
CMD ["npm", "run", "preview"]
