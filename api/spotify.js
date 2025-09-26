import { getTopTracks } from "../utils/spotify.js";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const tracks = await getTopTracks();
  const base64Covers = await Promise.all(tracks.map(async (t) => await getAlbumImage(t.albumArt)));
  
  const svg = `
    <svg width="400" height="${70 * tracks.length + 50}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${tracks.map((_, i) => {
          const y = i * 70 + 60;
          return `
            <clipPath id="rounded${i}">
              <rect x="10" y="${y}" width="50" height="50" rx="6" ry="6" />
            </clipPath>
          `;
        })
        .join("")}
        <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#1db954" />
            <stop offset="100%" stop-color="#14833b" />
        </linearGradient>
      })}
      </defs>
      <style>
        .text { font: 15px "Segoe UI", "Helvetica Neue", "Arial", sans-serif; fill:  rgb(210, 210, 210); font-weight: 550; text-rendering: optimizeLegibility; }
        .bigText { font-size: 22px; text-decoration: underline; }
      </style>
      <rect width="100%" height="100%" fill="url(#bgGradient)" rx="15"/>

      <text x="15" y="35" class="text bigText">My Top Tracks</text>

      ${tracks
        .map((track, i) => {
          const y = i * 70 + 90;
          var text = escapeXml(`${track.name} - ${track.artist}`);
          if(text.length > 43) {
            text = text.substring(0, 40) + '...';
          }
          return `
            <rect x="0" y="${y - 35}" width="400" height="60" fill="rgba(0, 0, 0, 0.04)" />
            <image href="data:image/jpeg;base64,${base64Covers[i]}" x="10" y="${y - 30}" width="50" height="50" clip-path="url(#rounded${i})"/>
            <text x="70" y="${y}" class="text">${text}</text>
          `;
        })
        .join("")}
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.send(svg);
};

async function getAlbumImage(imageUrl) {
  const res = await fetch(imageUrl);
  const buffer = await res.buffer();
  return buffer.toString('base64');
}

function escapeXml(str) {
  if (typeof str !== "string") return str;
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}