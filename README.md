# MoodPraiser

Live Demo: https://moodpraiser.candys.page

MoodPraiser is a simple, useful and fun habit tracker that keeps you and your friends accountable for each other by giving priases y'all deserve to **reach your goal**!

Check out the [blog post](https://) to get the whole story behind the project!

## Running your own MoodPraiser

### Prerequisites

* Auth0 account - Check [this article](https://auth0.com/docs/quickstart/webapp/nextjs/01-login#configure-the-sdk) on how to fill out the Auth0 environment variables
* HarperDB account

Please create a `.env.local` in the project root with the following fields filled out:

```
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
HARPERDB_KEY=
HARPERDB_URL=
```

### Step 0: Setup the HarperDB database

* Create a schema called dev
* Create the tables and columns as the following

### Step 1: Install dependencies

```bash
npm install
# or
yarn
```

### Step 2: Start the development server

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Step 3: Check out MoodPraiser

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
