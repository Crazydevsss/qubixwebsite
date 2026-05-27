const games = [

  {
    name: "Let Me Bake",
    description: "A cozy baking simulator focused on cooking, decorating, upgrades, and progression.",
    image: "assets/letmebake.png",

    status: "development",
    statusText: "In Development",

    visits: "0",
    ccu: "0",

    robloxUrl: "https://www.roblox.com/",
    discordUrl: "https://discord.gg/YOURSERVER"
  },

  {
    name: "Grenade Battles",
    description: "Fast-paced arena combat with explosive PvP chaos.",
    image: "assets/grenade.png",

    status: "development",
    statusText: "In Development",

    visits: "0",
    ccu: "0",

    robloxUrl: "https://www.roblox.com/",
    discordUrl: "https://discord.gg/YOURSERVER"
  },

  {
    name: "Kinoe",
    description: "An upcoming anime-inspired Roblox experience.",
    image: "assets/kinoe.png",

    status: "soon",
    statusText: "Coming Soon",

    visits: "0",
    ccu: "0",

    robloxUrl: "https://www.roblox.com/",
    discordUrl: "https://discord.gg/YOURSERVER"
  }

];

const gamesGrid = document.getElementById("gamesGrid");

function renderGames(){

  gamesGrid.innerHTML = games.map(game => `

    <article class="game-card">

      <img src="${game.image}" alt="${game.name}">

      <div class="overlay"></div>

      <div class="content">

        <span class="status ${game.status}">
          ${game.statusText}
        </span>

        <h2>
          ${game.name}
        </h2>

        <p>
          ${game.description}
        </p>

        <div class="stats">

          <div>
            <span>Live Players</span>
            <strong>${game.ccu}</strong>
          </div>

          <div>
            <span>Visits</span>
            <strong>${game.visits}</strong>
          </div>

        </div>

        <div class="card-actions">

          <a class="roblox-btn"
             href="${game.robloxUrl}"
             target="_blank">
             Join Roblox ›
          </a>

          <a class="discord-btn"
             href="${game.discordUrl}"
             target="_blank">
             Join Discord ›
          </a>

        </div>

      </div>

    </article>

  `).join("");

}

renderGames();