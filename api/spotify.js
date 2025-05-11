const { getTopTracks } = require("../utils/spotify");

module.exports = async function handler(req, res) {
  const tracks = await getTopTracks();

  const svg = `
    <svg width="400" height="${60 * tracks.length}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .text { font: 14px sans-serif; fill: white; }
        .bg { fill: #1db954; }
      </style>
      <rect width="100%" height="100%" class="bg"/>
      ${tracks
        .map((track, i) => {
          const y = i * 60 + 20;
          return `
            <image href="${track.albumArt}" x="10" y="${y - 10}" width="40" height="40"/>
            <text x="60" y="${y}" class="text">${track.name} — ${track.artist}</text>
          `;
        })
        .join("")}
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");
  res.send(svg);
};
