const Sentiment = require("sentiment");

const sentimentAnalyzer = new Sentiment();

async function analyzeSentiment(req, res) {
  const lyrics = req.body.lyrics;
  const sentiment = sentimentAnalyzer.analyze(lyrics);
  res.json(sentiment);
}

module.exports = {
  analyzeSentiment,
};
