import { getTopTracks } from "../utils/spotify.js";

export default async function handler(req, res) {
  const tracks = await getTopTracks();

  const svg = `
    <svg width="400" height="${70 * tracks.length}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${tracks.map((_, i) => {
          const y = i * 70 + 10;
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
        .text { font: 16px "Segoe UI", "Helvetica Neue", "Arial", sans-serif; fill:  rgb(210, 210, 210); font-weight: 550; text-rendering: optimizeLegibility; }
      </style>
      <rect width="100%" height="100%" fill="url(#bgGradient)" rx="15"/>
      ${tracks
        .map((track, i) => {
          const y = i * 70 + 40;
          return `
            <rect x="0" y="${y - 35}" width="400" height="60" fill="rgba(0, 0, 0, 0.04)" />
            <image href="${track.albumArt}" x="10" y="${y - 30}" width="50" height="50" clip-path="url(#rounded${i})"/>
            <text x="70" y="${y}" class="text">${track.name} — ${track.artist}</text>
          `;
        })
        .join("")}
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.send(svg);
};
