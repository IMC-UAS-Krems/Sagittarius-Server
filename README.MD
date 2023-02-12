# Sagittarius Server

This is a server for the Sagittarius project. It is a simple server that works as a router for the compiler, authentication and cloud database services.

## Contributing

This repository belongs to the Sagittarius project, thus the process to make changes requires that the changes be pushed to the main channel as well. Please refer your questions to the project owner.

### Installing dependencies
```bash
npm install
```

### Install prisma type definitions
```bash
npx prisma db pull
npx prisma generate
```

### Push your changes to the repository
```bash
git add .
git commit -m "Your commit message"
git push
```

### Propagate your changes to the main channel
```bash
cd <monorepo-directory>
git submodule update --remote
git add .
git commit -m "Your commit message"
git push
```

## Deploying
### Local
You can deploy the project locally using npm.
```bash
npm run start
```

### Docker
You can deploy the project using docker. It will run on port 8080.

First, expose the environment variables to the docker container.
```bash
source .env
```

Then, build the docker image.
```bash
docker build --build-arg compiler=$COMPILER_URL --build-arg db=$DATABASE_URL --build-arg supabase=$SUPABASE_URL --build-arg key=$SUPABASE_KEY --build-arg client=$CLIENT_URL -t server .
```

Finally, run the docker image.
```bash
docker run --publish 8080:8080 server
```

## Copyright
© 2022 IMC FH Krems

Logos and banners courtesy of [Lily](https://lilyoko.myportfolio.com)