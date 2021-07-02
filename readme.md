# Introduction

This project is a backend service for the Tinder Clone project.

# Features

1. Validation layer: Throws a 400 error code if the request has invalid data.
2. LRU cache layer: For cachable endpoints (Ex: find user by id), cache the data in RAM for pre-defined seconds.
3. Use `helmet` to increase project's security by re-configuring default HTTP headers set by `expressjs`.
4. Use `inversify` to implement Inversion of Control principle by using a DI container to perform Dependency Injection
5. Make use of typescript decorators to implement Validation layer and LRU caching layer.


# Setup

## Database

1. Create a database called `tinder_clone` in your local Postgres. You can choose other names but please make sure to update the `development.env` file.
2. Install the project: `yarn install`.
3. Run the migration commands:
  - Create tables: `yarn migrate::run`.
  - Create mock data to test: `yarn seed::run-all`.

## Authentication

Please set the `User-Id` HTTP header in your Tinder Clone front-end to the string `constant-user-id`. This `userId` is used to test the pair matching and history browsing features

# Bootstrap the project

Run `yarn dev` to start in development environment.
