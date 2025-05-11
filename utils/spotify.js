import fetch from 'node-fetch';
import querystring from 'querystring';

const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString("base64");

async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  return data.access_token;
}

export async function getTopTracks() {
  const token = await getAccessToken();
  const res = await fetch("https://api.spotify.com/v1/me/top/tracks?limit=5", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data.items.map(track => ({
    name: track.name,
    artist: track.artists.map(a => a.name).join(", "),
    albumArt: track.album.images[0]?.url,
  }));
}
