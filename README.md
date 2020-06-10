# Bank REST API

To configure your software you need to edit `.env` file. `.env` is the configuration file written in plain text format.

## Configuration

- On the beggining make a file with name `.env`
- In this file write `DATABASE_URL = your_database_url`
- In the next line write `JWT_Secret = your_secret_to_jwt` Learn more about [JSON_WEB_TOKEN] (https://jwt.io/)
- At this moment you can only host this in your local machine (I'm going to change this soon)

## How to start API

You have to download node compiler and after this write 2 commands
- `npm install` in your working directory
- `npm start`

## Features

- Signing users and logging in with authentication [JWT] (https://jwt.io/)
- Making transfers between users with appropriate bill using [postgressql] (https://www.postgresql.org/) 
- Getting history of transfers from appropriate user


