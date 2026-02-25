const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'img');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

const template = (dots) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="diceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#0f172a" flood-opacity="0.4"/>
    </filter>
    <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="redDotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#991b1b" />
    </linearGradient>
  </defs>
  <rect x="10" y="10" width="80" height="80" rx="15" fill="url(#diceGrad)" filter="url(#shadow)" stroke="#cbd5e1" stroke-width="1" />
  ${dots}
</svg>`;

const dot = (cx, cy, isRed = false) => `<circle cx="${cx}" cy="${cy}" r="8" fill="url(#${isRed ? 'redDotGrad' : 'dotGrad'})" />`;

const faces = [
    dot(50, 50, true), // 1
    dot(30, 30) + dot(70, 70), // 2
    dot(30, 30) + dot(50, 50) + dot(70, 70), // 3
    dot(30, 30) + dot(70, 30) + dot(30, 70) + dot(70, 70), // 4
    dot(30, 30) + dot(70, 30) + dot(50, 50) + dot(30, 70) + dot(70, 70), // 5
    dot(30, 25) + dot(70, 25) + dot(30, 50) + dot(70, 50) + dot(30, 75) + dot(70, 75) // 6
];

faces.forEach((dots, i) => {
    fs.writeFileSync(path.join(dir, `Dado${i + 1}.svg`), template(dots));
});

const favicon = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" rx="20" fill="#8b5cf6" />
  <circle cx="35" cy="35" r="12" fill="#ffffff" />
  <circle cx="65" cy="65" r="12" fill="#ffffff" />
</svg>`;
fs.writeFileSync(path.join(dir, 'favicon.svg'), favicon);
