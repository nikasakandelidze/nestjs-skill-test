## Introduction

This project is developed as a part of the NestJS Skill Test to demonstrate the capability of creating a robust backend service using NestJS framework version 10.0 or higher. The project employs PostgreSQL as the database, with TypeORM as the ORM of choice. Authentication is handled using plain JWT mechanism.

## Development Guide

### Pre requisites

- NodeJS installed V17.0.0 or higher
- Docker & Docker-Compose ( Optional, Read below to understand what's the optionality condition )

To run and use the API successfully on your development machine follow next steps:

- Clone the repository: `git clone https://github.com/nikasakandelidze/nestjs-skill-test`
- Enter the cloned directory of the project: `cd nestjs-skill-test`
- Install the dependencies: `npm i`
- Edit .env.development file to fill it with AWS related and JWT related ENV_VARIABLE values
  - Note that database config value specified in .env.development should only by used if you'll run database container by: `docker-compose up -d nestskill-dev-db`, in any other case please update DATABASE related env variable values accordingly.
- Run the app: `npm run start:dev`

## Running the app Guide

To run the application successfully on your machine of preference there are couple of different ways ( all of them with their own pre-requisites):

### Pre-requisites For Running With Docker-Compose

- Docker
- Docker-compose

## Stay in touch

- Author - [Nika Sakandelidze](https://www.linkedin.com/in/nikoloz-sakandelidze-004720189/)
- Website - [Nika's Personal Page](https://sakandelidze.notion.site/Nika-s-personal-page-156bb188536c48e395f7598619dd0ab8?pvs=4)
