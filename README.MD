# Sagittarius Client

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
git push -u main main
```

### Propagate your changes to the main channel
```bash
cd <monorepo-directory>
git submodule update --remote
git add .
git commit -m "Your commit message"
git push -u main main
```

## Deploying
### Local
You can deploy the project locally using npm.
```bash
npm run start
```

### Docker
You can deploy the project using docker. It will run on port 8080.
```bash
docker build -t sagittarius-server .
```

## Copyright
© 2022 IMC FH Krems

Logos and banners courtesy of [Lily](https://lilyoko.myportfolio.com)