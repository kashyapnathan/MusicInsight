import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [playlistId, setPlaylistId] = useState("");
  const [tracks, setTracks] = useState([]);
  const [sentiment, setSentiment] = useState(null);
  const [showSentiment, setShowSentiment] = useState(false);
  const [averageSentiment, setAverageSentiment] = useState(null);


  const fetchTracks = async (playlistId) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/playlist-tracks/${playlistId}`
      );
      const trackItems = response.data.items.map((item) => item.track);
      setTracks(trackItems);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      setTracks([]);
    }
  };

  const calculateAverageSentiment = () => {
    if (sentiment) {
      const totalSentiment = Object.values(sentiment).reduce((total, current) => total + current.score, 0);
      const avgSentiment = totalSentiment / tracks.length;
      setAverageSentiment(avgSentiment);
    }
  };

  const fetchSentimentAnalysis = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/analyze-sentiments",
        {
          tracks: tracks,
        }
      );
      const sentiments = response.data;
      setSentiment(sentiments);
      setShowSentiment(true);
    } catch (error) {
      console.error("Error fetching sentiment analysis:", error);
    }
  };

  const handlePlaylistIdSubmit = () => {
    fetchTracks(playlistId);
  };

  return (
    <div className="App">
      <h1>MusicInsight</h1>
      <form onSubmit={handlePlaylistIdSubmit}>
        <label htmlFor="playlistId">Playlist ID:</label>
        <input
          type="text"
          id="playlistId"
          value={playlistId}
          onChange={(e) => setPlaylistId(e.target.value)}
        />
      </form>
      <br />
      <div className="buttons">
        <button className="fetch-tracks-btn" onClick={handlePlaylistIdSubmit}>
          Fetch Tracks
        </button>
        <button
          className="analyze-sentiment-btn"
          onClick={fetchSentimentAnalysis}
        >
          Analyze Sentiment
        </button>
      </div>
      {showSentiment && averageSentiment !== null && (
        <p>Average Sentiment Score: {averageSentiment.toFixed(2)}</p>
      )}
      
      <br />
      <h2>Tracks</h2>
      <div className="track-headers">
        <div>Title</div>
        <div>Artist</div>
        <div>Sentiment Score</div>
      </div>
      <ul>
        {tracks.map((track) => (
          <li key={track.id} className="track-row">
            <div>{track.name}</div>
            <div>{track.artists[0].name}</div>
            <div>
              {track.popularity}
              {showSentiment && sentiment && sentiment[track.id] && (
                <>
                  {sentiment[track.id].score} |{" "}
                  {sentiment[track.id].comparative}
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
