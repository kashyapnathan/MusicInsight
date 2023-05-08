const express = require("express");
const cors = require("cors");
const axios = require("axios");
const lyricsFinder = require("lyrics-finder");
const SpotifyWebApi = require("spotify-web-api-node");
const { analyzeSentiment } = require("./app");

const app = express();
app.use(cors());
app.use(express.json());

const clientId = "!!SPOTIFY_CLIENT_ID!!";
const clientSecret = "!!SPOTIFY_CLIENT_SECRET!!";

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret,
});

async function refreshToken() {
  try {
    const response = await axios.post("https://accounts.spotify.com/api/token", null, {
      params: {
        grant_type: "client_credentials",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
    });
    spotifyApi.setAccessToken(response.data.access_token);
  } catch (error) {
    console.error("Error refreshing Spotify access token:", error);
  }
}

refreshToken();
setInterval(refreshToken, 1000 * 60 * 60);

app.get("/playlist-tracks/:playlistId", async (req, res) => {
  try {
    const response = await spotifyApi.getPlaylistTracks(req.params.playlistId);
    res.json(response.body);
  } catch (error) {
    console.error("Error fetching playlist tracks:", error);
    res.status(500).json({ error: error.message });
  }
});

app.post("/analyze-sentiments", async (req, res) => {
  const tracks = req.body.tracks;
  const sentimentResults = {};

  for (const track of tracks) {
    const artist = track.artists[0].name;
    const title = track.name;

    try {
      const lyrics = await lyricsFinder(artist, title);
      const sentiment = analyzeSentiment(lyrics);
      sentimentResults[track.id] = sentiment;
    } catch (error) {
      console.error(`Error analyzing sentiment for ${title} by ${artist}:`, error);
    }
  }

  res.json(sentimentResults);
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
