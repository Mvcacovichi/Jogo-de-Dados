document.addEventListener("DOMContentLoaded", () => {
   const btn = document.getElementById("roll-btn");
   const cube1 = document.getElementById("cube1");
   const cube2 = document.getElementById("cube2");
   const title = document.getElementById("result-title");

   function createFallingDice() {
      const container = document.getElementById("falling-dice-container");
      if (!container) return;

      const numDice = 20;
      for (let i = 0; i < numDice; i++) {
         const dice = document.createElement("div");
         dice.classList.add("falling-die");

         const faceValue = Math.floor(Math.random() * 6) + 1;
         dice.classList.add("bg-face-" + faceValue);

         for (let j = 0; j < faceValue; j++) {
            const dot = document.createElement("div");
            dot.classList.add("bg-dot");
            dice.appendChild(dot);
         }

         const size = Math.random() * 40 + 35; // 35px to 75px
         dice.style.width = size + "px";
         dice.style.height = size + "px";

         dice.style.left = Math.random() * 100 + "vw";
         dice.style.animationDuration = (Math.random() * 10 + 10) + "s"; // 10s to 20s
         dice.style.animationDelay = "-" + (Math.random() * 20) + "s"; // Negative delay to start randomly on screen

         container.appendChild(dice);
      }
   }
   createFallingDice();

   let isRolling = false;

   btn.addEventListener("click", () => {
      if (isRolling) return;
      isRolling = true;

      title.innerHTML = 'Rolando os dados... <span class="rolling-icon">🎲</span>';

      const randomnumber1 = Math.floor(Math.random() * 6) + 1;
      const randomNumber2 = Math.floor(Math.random() * 6) + 1;

      const getTransform = (num) => {
         let x = 0, y = 0;
         switch (num) {
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
         return `translateZ(-50px) rotateX(${x}deg) rotateY(${y}deg)`;
      };

      cube1.style.transform = getTransform(randomnumber1);
      cube2.style.transform = getTransform(randomNumber2);

      setTimeout(() => {
         if (randomnumber1 > randomNumber2) {
            title.innerHTML = '<span class="trophy">🏆</span> <span class="win-text">Jogador 1 Ganhou!</span>';
            fireConfetti();
         } else if (randomNumber2 > randomnumber1) {
            title.innerHTML = '<span class="trophy">🏆</span> <span class="win-text">Jogador 2 Ganhou!</span>';
            fireConfetti();
         } else {
            title.innerHTML = '<span class="sword">⚔</span> <span class="draw-text">Empate!</span> <span class="sword">⚔</span>';
         }
         isRolling = false;
      }, 1500);
   });

   function fireConfetti() {
      var duration = 3 * 1000;
      var animationEnd = Date.now() + duration;
      var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
         return Math.random() * (max - min) + min;
      }

      var interval = setInterval(function () {
         var timeLeft = animationEnd - Date.now();

         if (timeLeft <= 0) {
            return clearInterval(interval);
         }

         var particleCount = 50 * (timeLeft / duration);
         // since particles fall down, start a bit higher than random
         confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
         });
         confetti({
            ...defaults, particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
         });
      }, 250);
   }
});
