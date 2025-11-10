# My "flight-shame" app

<a href="https://flight-shame.netlify.app/" target="_blank" rel="noopener noreferrer">
  Open Live Demo on Netlify
  </a> <br><br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/c00d9177-3b47-4ffc-9aa4-af8ececd6731/deploy-status)](https://app.netlify.com/projects/flight-shame/deploys)<br><br>

<img width="auto" height="auto" alt="image" src="https://github.com/user-attachments/assets/6c5ed4f1-5412-40e8-9833-2f224efa3987" />

## Flight Shame – Calculate your flight’s CO₂ emissions

- Flight Shame is a simple educational web app that estimates the carbon footprint of flights between airports.
- It uses the Climatiq API for emission data and a Netlify serverless function to keep the API key secure.

## How it works

- Select departure and destination airports
- The app calculates the flight distance using the Haversine formula
- A serverless Netlify function sends that distance to the Climatiq API
- The CO₂ emission estimate is returned and displayed in the UI

## Environment Setup

- The Climatiq API key is stored securely in a .env file (ignored by Git).
- When deployed to Netlify, the same key is added under:
- Site Settings, Environment Variables, CLIMATIQ_API_KEY
- This ensures that the API key never appears in client-side code.

## Tech stack

- Vanilla JavaScript
- Netlify Functions
- fetches environmental data with `Climatiq API`
- fetches json data (airport information - a `GitHub gist`)
- HTML
- CSS

### Requirements

- `Node.js` installed
- `Netlify CLI` installed globally from the terminal `npm install -g netlify-cli`
- `A free Netlify account` https://www.netlify.com/
- `A free API Climatiq account` https://www.climatiq.io/

### Setup

1. Clone repository `git clone https://github.com/sarasjodin/flight-shame.git`
2. `cd flight-shame`
3. Create a Climatiq account
4. Create a free api-key in Climatiq
5. Create a `.env` file in your repo, root directory, and add: `CLIMATIQ_API_KEY=your-secret-api-key` to the file
6. Add `.env` to `.gitignore` file (to keep your key private)
7. Create a Netlify account
8. Login to your Netlify account with CLI: `netlify login`
9. Start the Netlify local dev server with CLI: `netlify dev`
10. Run your frontend and serverless functions together on `http://localhost:8888`

### To deploy to Netlify

Before you deploy your project to Netlify, set the same environment variable in Netlify:

- Alterantiv `a`: Set your API key to Netlify with CLI: `netlify env:set CLIMATIQ_API_KEY "your-secret-api-key"`
- Alterantiv `b`: Set your API key to Netlify directly in the Netlify dashboard: `Netlify, Site Settings, Environment Variables`.

11: Run the following command with CLI to deploy: `netlify deploy`

### How to use the API key in the code

The API key is accessed in code with `const key = process.env.CLIMATIQ_API_KEY;`
