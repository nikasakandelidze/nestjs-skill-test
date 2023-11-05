## Introduction

This project is developed as a part of the NestJS Skill Test to demonstrate the capability of creating a robust backend service using NestJS framework version 10.0 or higher. The project employs PostgreSQL as the database, with TypeORM as the ORM of choice. Authentication is handled using plain JWT mechanism.

## Development Guide

### Pre requisites for Dev Setup

- NodeJS installed V17.0.0 or higher
- Docker & Docker-Compose ( Optional, Read below to understand what's the optionality condition )

To run and use the API successfully on your development machine follow next steps:

### Dev Setup

- Clone the repository: `git clone https://github.com/nikasakandelidze/nestjs-skill-test`
- Enter the cloned directory of the project: `cd nestjs-skill-test`
- Install the dependencies: `npm i`
- Edit .env.development file to fill it with AWS related and JWT related ENV_VARIABLE values
  - Note that database config value specified in .env.development should only by used if you'll run database container by: `docker-compose up -d nestskill-dev-db`, in any other case please update DATABASE related env variable values accordingly.
- Run the app: `npm run start:dev`

## Running the app Guide

### Pre-requisites For Running the API ( Easiest way )

- Docker
- Docker-compose

### Running the API ( Easiest way )

- Clone the repository: `git clone https://github.com/nikasakandelidze/nestjs-skill-test`
- Enter the cloned directory of the project: `cd nestjs-skill-test`
- Open docker-compose file and fill in the values for AWS & JWT specific env variables so that container created and used in docker-compose composition operates correctly. ( These values are marked with comments for you be easily able to fill them out )
- In the root of the project run: `docker-compose up -d`
- The application should be running on the: http://localhost:3000

## Stay in touch

- Author - [Nika Sakandelidze](https://www.linkedin.com/in/nikoloz-sakandelidze-004720189/)
- Website - [Nika's Personal Page](https://sakandelidze.notion.site/Nika-s-personal-page-156bb188536c48e395f7598619dd0ab8?pvs=4)
