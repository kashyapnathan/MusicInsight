# MusicInsight
MusicInsight is a web application that helps users analyze the sentiment of their Spotify playlists. By fetching the tracks in a given playlist and calculating the sentiment score, the application provides insight into the overall mood of the playlist.

## Features
Fetch tracks from a Spotify playlist using the playlist ID
Calculate sentiment scores for each track in the playlist
Display the sentiment score for each track

## Getting Started
These instructions will help you set up the project on your local machine for development and testing purposes.

## Prerequisites
Node.js and npm installed on your machine

Spotify API key and secret

A Spotify playlist to analyze

## Installation
### Clone the repository:
'git clone https://github.com/your_username_here/MusicInsight.git'


### Change to the project directory:
```
cd MusicInsight
```

### Install dependencies:
```
npm install
```

### Create a .env file in the project root directory with your Spotify API key and secret:
```
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

### Start the development server:
```
npm start
```

### Open your browser and navigate to http://localhost:3000.

## Usage
Enter the playlist ID of a Spotify playlist and click the "Fetch Tracks" button.
The tracks in the playlist will be displayed along with the artists' names.
Click the "Analyze Sentiment" button to calculate the sentiment scores for each track.
The sentiment scores for each track will be displayed.

## Technologies Used:
```
React
Axios
Spotify API
Sentiment Analysis API
```

## Project Recap
MusicInsight is a web application that allows users to gain insight into the sentiment of their Spotify playlists. The application fetches track information from Spotify and analyzes the sentiment of each track using a sentiment analysis API. The user can view the sentiment scores for individual tracks.

The project was built using React for the frontend and Axios for making API requests to Spotify and the sentiment analysis API. The application uses useState hooks for managing the state of fetched tracks, sentiment scores, and UI elements. The UI is styled using custom CSS classes.

In future updates, I could expand the application to support more features like creating new playlists based on sentiment scores, providing track recommendations based on user preferences, and more.
