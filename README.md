#### CLEVERA Frontend for AI-Driven Conversational Application


#### Overview

`This frontend project is built using Next.js and React.js to provide a user interface for interacting with an AI-powered backend. The backend, built with Django REST Framework and LangChain, interacts with OpenAI’s GPT models to answer user questions.`

## Project Overview
    Chat Interface: Users can ask questions in a conversational interface.
    File Upload: Users can upload a .txt file for starting a session.
    Data Visualization: Stored questions and answers are visualized using charts for insights into user interactions.
    Web Scraping: Integrating with the backend to scrape textual content from URLs provided by the user.

## Features

- Conversational Interface

    Users can interact with the AI by asking questions via the chat interface.
    Questions are processed in real-time, and the backend responds with contextually relevant answers based on uploaded .txt file.

- File Upload

    Users can upload .txt files containing relevant information that will be processed by the backend to start a new session.
    The uploaded files help improve the contextual accuracy of the answers provided by the AI.

- Data Visualization

    Visualization of questions and answers stored in the database to provide insights into user interactions.
    A DataVisualizationPage is included to display this information in an easy-to-read format.

- Web Scraping Integration

    Users can provide URLs, and the frontend interacts with the backend to scrape text from the specified pages.
    The scraped text is then available for review or further processing in the application.


## Installation
####  Prerequisites

    Node.js v14 or later
    Yarn or npm
    Next.js



#### Install the dependencies:

```bash
npm install
```

#### Create a .env file in the root directory with the following content:

```bash
REACT_APP_API_URL=http://your-backend-url/
REACT_APP_SCRAPER_URL=http://your-scraper-url/
```

#### Run the development server:

```bash

npm run dev
```
Visit the app at http://localhost:3000/


## Running the Docker Setup

#### Build and run the services:
```bash
docker-compose up --build
```
Open the app in your browser: Visit http://localhost:3000.

#### To stop the services, use:
```bash
docker-compose down
```

## Running in Production

#### Build the app for production:
```bash
npm run build
```

#### Start the production server:
```bash
npm run start
```

Visit the production app at http://localhost:3000.

