const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

/* FLOATING ANIMATION */

const cards = document.querySelectorAll(
  ".card, .team-card, .project-showcase"
);

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;

  cards.forEach((card) => {
    card.style.transform =
      `rotateY(${x}deg) rotateX(${-y}deg)`;
  });
});