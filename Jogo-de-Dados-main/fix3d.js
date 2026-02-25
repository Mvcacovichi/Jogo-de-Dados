const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');
const d1 = `<div class="dice-scene"><div class="cube" id="cube1"><div class="cube__face cube__face--1"><div class="dot red"></div></div><div class="cube__face cube__face--2"><div class="dot"></div><div class="dot"></div></div><div class="cube__face cube__face--3"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div class="cube__face cube__face--4"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div class="cube__face cube__face--5"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div class="cube__face cube__face--6"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>`;
const d2 = `<div class="dice-scene"><div class="cube" id="cube2"><div class="cube__face cube__face--1"><div class="dot red"></div></div><div class="cube__face cube__face--2"><div class="dot"></div><div class="dot"></div></div><div class="cube__face cube__face--3"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div class="cube__face cube__face--4"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div class="cube__face cube__face--5"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div><div class="cube__face cube__face--6"><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>`;

html = html.replace(/<div class="dice-img-container">\s*<img src="img\/Dado1\.svg".*?id="img1" \/>\s*<\/div>/, d1);
html = html.replace(/<div class="dice-img-container">\s*<img src="img\/Dado2\.svg".*?id="img2" \/>\s*<\/div>/, d2);
fs.writeFileSync('index.html', html);

let js = `document.addEventListener("DOMContentLoaded", () => {
   const btn = document.getElementById("roll-btn");
   const cube1 = document.getElementById("cube1");
   const cube2 = document.getElementById("cube2");
   const title = document.getElementById("result-title");
   
   let isRolling = false;

   btn.addEventListener("click", () => {
      if (isRolling) return;
      isRolling = true;

      title.innerHTML = "Rolando os dados... 🎲";

      const randomnumber1 = Math.floor(Math.random() * 6) + 1;
      const randomNumber2 = Math.floor(Math.random() * 6) + 1;

      const getTransform = (num) => {
          let x = 0, y = 0;
          switch(num) {
              case 1: x = 0; y = 0; break;
              case 2: x = 0; y = -180; break;
              case 3: x = 0; y = -90; break;
              case 4: x = 0; y = 90; break;
              case 5: x = -90; y = 0; break;
              case 6: x = 90; y = 0; break;
          }
          // add extra spins for animation
          x += Math.floor(Math.random() * 4 + 2) * 360;
          y += Math.floor(Math.random() * 4 + 2) * 360;
          return \`translateZ(-50px) rotateX(\${x}deg) rotateY(\${y}deg)\`;
      };

      cube1.style.transform = getTransform(randomnumber1);
      cube2.style.transform = getTransform(randomNumber2);

      setTimeout(() => {
         if (randomnumber1 > randomNumber2) {
            title.innerHTML = '🏆 Jogador 1 Ganhou!';
         } else if (randomNumber2 > randomnumber1) {
            title.innerHTML = '🏆 Jogador 2 Ganhou!';
         } else {
            title.innerHTML = '⚔ Empate! ⚔ ';
         }
         isRolling = false;
      }, 1500);
   });
});
`;
fs.writeFileSync('app.js', js);

let css = fs.readFileSync('style.css', 'utf8');
css += `
/* ----------- REAL 3D CUBE DICE CSS ------------ */
.dice-scene {
    width: 100px;
    height: 100px;
    perspective: 600px;
    margin: 1rem;
    display: inline-block;
}

.cube {
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transform: translateZ(-50px) rotateX(15deg) rotateY(15deg);
    transition: transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cube__face {
    position: absolute;
    width: 100px;
    height: 100px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(226, 232, 240, 0.9));
    box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
}

.dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #0f172a;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.5);
    position: absolute;
}
.dot.red { background: #ef4444; }

.cube__face--1 .dot { top: 40px; left: 40px; }
.cube__face--2 .dot:nth-child(1) { top: 20px; left: 20px; }
.cube__face--2 .dot:nth-child(2) { bottom: 20px; right: 20px; }
.cube__face--3 .dot:nth-child(1) { top: 20px; left: 20px; }
.cube__face--3 .dot:nth-child(2) { top: 40px; left: 40px; }
.cube__face--3 .dot:nth-child(3) { bottom: 20px; right: 20px; }
.cube__face--4 .dot:nth-child(1) { top: 20px; left: 20px; }
.cube__face--4 .dot:nth-child(2) { top: 20px; right: 20px; }
.cube__face--4 .dot:nth-child(3) { bottom: 20px; left: 20px; }
.cube__face--4 .dot:nth-child(4) { bottom: 20px; right: 20px; }
.cube__face--5 .dot:nth-child(1) { top: 20px; left: 20px; }
.cube__face--5 .dot:nth-child(2) { top: 20px; right: 20px; }
.cube__face--5 .dot:nth-child(3) { top: 40px; left: 40px; }
.cube__face--5 .dot:nth-child(4) { bottom: 20px; left: 20px; }
.cube__face--5 .dot:nth-child(5) { bottom: 20px; right: 20px; }
.cube__face--6 .dot:nth-child(1) { top: 15px; left: 20px; }
.cube__face--6 .dot:nth-child(2) { top: 40px; left: 20px; }
.cube__face--6 .dot:nth-child(3) { bottom: 15px; left: 20px; }
.cube__face--6 .dot:nth-child(4) { top: 15px; right: 20px; }
.cube__face--6 .dot:nth-child(5) { top: 40px; right: 20px; }
.cube__face--6 .dot:nth-child(6) { bottom: 15px; right: 20px; }

.cube__face--1  { transform: rotateY(  0deg) translateZ(50px); }
.cube__face--2  { transform: rotateY(180deg) translateZ(50px); }
.cube__face--3  { transform: rotateY( 90deg) translateZ(50px); }
.cube__face--4  { transform: rotateY(-90deg) translateZ(50px); }
.cube__face--5  { transform: rotateX( 90deg) translateZ(50px); }
.cube__face--6  { transform: rotateX(-90deg) translateZ(50px); }
`;
fs.writeFileSync('style.css', css);
