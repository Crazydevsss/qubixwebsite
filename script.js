const livePlayersEl = document.getElementById("livePlayers");
const totalVisitsEl = document.getElementById("totalVisits");
const groupMembersEl = document.getElementById("liveGroupmembers");

let currentCCU = 0;
let currentVisits = 0;
let currentMembers = 0;

const placeIds = [
  "23434", // Grenade Battles
  "12345678901234",  // Let Me Bake
  "98765432109876" ,  // Kinoe
  "102644836708213", // Ay Mi Gatito Scary Troll Slap tower
  "119141950767466", // 61 Scary Troll Slap Tower
  "112137948403849", // 67 Scary Troll Slap Tower
  "166623746223", // Project rng 
  "117050355640712", // My Singing Fish
];

const groupIds = [
  "32898726", // BX's Studios
  "500138575", // HowtoCCU?
  "312771294",  // 2 Negatives
  "35426666", // CrazyStudioss
  "33974446", // Epic Sense
  
];


function formatNumber(num) {
  const n = Number(num) || 0;
  if (n >= 1000000000) return (n / 1000000000).toFixed(1) + "B";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  return Math.floor(n).toLocaleString();
}

function animateValue(element, start, end, duration = 1000) {
  if (!element) return;

  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = start + (end - start) * eased;

    element.textContent = formatNumber(value);

    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

async function getUniverseId(placeId) {
  const res = await fetch(`https://apis.roproxy.com/universes/v1/places/${placeId}/universe`);
  if (!res.ok) throw new Error("Universe failed");
  const data = await res.json();
  return data.universeId;
}

async function getGameStats(universeId) {
  const res = await fetch(`https://games.roproxy.com/v1/games?universeIds=${universeId}`);
  if (!res.ok) throw new Error("Stats failed");
  const data = await res.json();
  return data.data?.[0];
}

async function getTotalGroupMembers() {
  let total = 0;
  let success = false;

  for (const groupId of groupIds) {
    try {
      const res = await fetch(`https://groups.roproxy.com/v1/groups/${groupId}`);

      if (!res.ok) {
        console.warn("Group request failed:", groupId, res.status);
        continue;
      }

      const data = await res.json();

      if (typeof data.memberCount === "number") {
        total += data.memberCount;
        success = true;
      } else {
        console.warn("No memberCount for group:", groupId, data);
      }

    } catch (err) {
      console.error("Group failed:", groupId, err);
    }
  }

  if (!success) {
    return currentMembers; // keeps old number instead of resetting to 0
  }

  return total;
}

async function updateLiveOpsStats() {
  let newCCU = 0;
  let newVisits = 0;

  for (const placeId of placeIds) {
    try {
      const universeId = await getUniverseId(placeId);
      const game = await getGameStats(universeId);

      if (!game) continue;

      newCCU += game.playing || 0;
      newVisits += game.visits || 0;
    } catch (err) {
      console.error("Game failed:", placeId, err);
    }
  }

  animateValue(livePlayersEl, currentCCU, newCCU, 900);
  animateValue(totalVisitsEl, currentVisits, newVisits, 1200);

  currentCCU = newCCU;
  currentVisits = newVisits;

  const newMembers = await getTotalGroupMembers();

  animateValue(groupMembersEl, currentMembers, newMembers, 1000);
  currentMembers = newMembers;
}

updateLiveOpsStats();
setInterval(updateLiveOpsStats, 20000);