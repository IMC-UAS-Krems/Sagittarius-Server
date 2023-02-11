FROM node:19-alpine

# Arguments
ARG compiler
ARG db
ARG supabase
ARG key

# Environment variables
ENV COMPILER_URL $compiler
ENV DATABASE_URL $db
ENV SUPABASE_URL $supabase
ENV SUPABASE_KEY $key

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Prisma generate
RUN npx prisma db pull

RUN npx prisma generate

EXPOSE 8080

CMD ["npm", "run", "start"]