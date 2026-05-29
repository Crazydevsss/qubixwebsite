const games = [
  {
    name: "Let Me Bake",
    description: "A cozy baking simulator focused on cooking, decorating, upgrades, and progression.",
    image: "assets/letmebake.png",
    status: "soon",
    statusText: "Coming Soon",
    ccu: "0",
    visits: "0",
    robloxUrl: "https://www.roblox.com/",
    discordUrl: "https://discord.gg/YOURSERVER"
  },

  {
    name: "Project Rng",
    description: "A live anime-inspired RNG aura experience with collection, rarity, and progression.",
    image: "assets/animeauras.webp",
    status: "live",
    statusText: "Live",
    ccu: "Loading...",
    visits: "Loading...",
    placeId: "16662374622", 
    robloxUrl: "https://www.roblox.com/games/16662374622/Project-RNG",
    discordUrl: "https://discord.gg/YOURSERVER"
  },

  {
    name: "Grendade battles",
    description: "A live anime-inspired RNG aura experience with collection, rarity, and progression.",
    image: "assets/grenade.png",
    status: "Development",
    statusText: "In Development",
    ccu: "Loading...",
    visits: "Loading...",
    placeId: "77575642698866",
    robloxUrl: "https://www.roblox.com/games/77575642698866/Grendade-Battles",
    discordUrl: "https://discord.gg/gJ4rCEnwcq"
  }
];

const gamesGrid = document.getElementById("gamesGrid");

function formatNumber(num) {
  const number = Number(num);
  if (Number.isNaN(number)) return String(num);
  if (number >= 1_000_000_000) return (number / 1_000_000_000).toFixed(1) + "B";
  if (number >= 1_000_000) return (number / 1_000_000).toFixed(1) + "M";
  if (number >= 1_000) return number.toLocaleString();
  return number.toString();
}

function renderGames() {
  gamesGrid.innerHTML = games.map((game, index) => `
    <article class="game-card" data-index="${index}">
      <img src="${game.image}" alt="${game.name}">
      <div class="overlay"></div>

      <div class="content">
        <span class="status ${game.status}">
          ${game.statusText}
        </span>

        <h2>${game.name}</h2>
        <p>${game.description}</p>

        <div class="stats">
          <div>
            <span>Live Players</span>
            <strong data-ccu="${index}">${game.ccu}</strong>
          </div>

          <div>
            <span>Visits</span>
            <strong data-visits="${index}">${game.visits}</strong>
          </div>
        </div>

        <div class="card-actions">
          <a class="roblox-btn" href="${game.robloxUrl}" target="_blank">
            Join Roblox ›
          </a>

          <a class="discord-btn" href="${game.discordUrl}" target="_blank">
            Join Discord ›
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

function animateNumber(element, start, end, duration = 1200) {
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * eased);

    element.textContent = formatNumber(current);

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

async function updateRobloxStats() {
  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    const ccuElement = document.querySelector(`[data-ccu="${i}"]`);
    const visitsElement = document.querySelector(`[data-visits="${i}"]`);

    if (!game.placeId) {
      ccuElement.textContent = formatNumber(game.ccu);
      visitsElement.textContent = formatNumber(game.visits);
      continue;
    }

    try {
      const universeResponse = await fetch(
        `https://apis.roproxy.com/universes/v1/places/${game.placeId}/universe`
      );

      const universeData = await universeResponse.json();

      const statsResponse = await fetch(
        `https://games.roproxy.com/v1/games?universeIds=${universeData.universeId}`
      );

      const statsData = await statsResponse.json();
      const info = statsData.data[0];

      animateNumber(ccuElement, 0, info.playing, 900);
animateNumber(visitsElement, 0, info.visits, 1400);

    } catch (error) {
      console.error("Roblox stats failed:", error);

      ccuElement.textContent = "0";
      visitsElement.textContent = "0";
    }
  }
}

renderGames();
updateRobloxStats();
setInterval(updateRobloxStats, 20000);