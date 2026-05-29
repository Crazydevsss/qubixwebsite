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
    name: "Anime Auras RNG",
    description: "A live anime-inspired RNG aura experience with collection, rarity, and progression.",
    image: "assets/animeauras.webp",
    status: "live",
    statusText: "Live",
    ccu: "0",
    visits: "226",
    universeId: "18284485835",
    robloxUrl: "https://www.roblox.com/games/2534724415/Emergency-Response-Liberty-County",
    discordUrl: "https://discord.gg/YOURSERVER"
  },

  {
    name: "Grenade Battles",
    description: "Fast-paced arena combat with explosive PvP chaos.",
    image: "assets/grenade.png",
    status: "development",
    statusText: "In Development",
    ccu: "0",
    visits: "0",
    robloxUrl: "https://www.roblox.com/",
    discordUrl: "https://discord.gg/YOURSERVER"
  },

  {
    name: "Kinoe",
    description: "An upcoming anime-inspired Roblox experience.",
    image: "assets/kinoe.png",
    status: "development",
    statusText: "In Development",
    ccu: "0",
    visits: "0",
    robloxUrl: "https://www.roblox.com/",
    discordUrl: "https://discord.gg/YOURSERVER"
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
            <strong data-ccu="${index}">${formatNumber(game.ccu)}</strong>
          </div>

          <div>
            <span>Visits</span>
            <strong data-visits="${index}">${formatNumber(game.visits)}</strong>
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

async function updateRobloxStats() {
  const liveGames = games.filter(game => game.universeId);

  if (liveGames.length === 0) return;

  try {
    const universeIds = liveGames.map(game => game.universeId).join(",");

    const response = await fetch(
      `https://games.roproxy.com/v1/games?universeIds=${universeIds}`
    );

    const result = await response.json();

    result.data.forEach(gameData => {
      const index = games.findIndex(game => String(game.universeId) === String(gameData.id));

      if (index === -1) return;

      const ccuElement = document.querySelector(`[data-ccu="${index}"]`);
      const visitsElement = document.querySelector(`[data-visits="${index}"]`);

      if (ccuElement) ccuElement.textContent = formatNumber(gameData.playing);
      if (visitsElement) visitsElement.textContent = formatNumber(gameData.visits);
    });

  } catch (error) {
    console.warn("Roblox live stats failed. Showing fallback numbers.");
  }
}

renderGames();
updateRobloxStats();
setInterval(updateRobloxStats, 60000);