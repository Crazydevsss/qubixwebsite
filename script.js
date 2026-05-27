const glow = document.querySelector(".mouse-glow");

if (glow) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

const changingText = document.querySelector(".changing-text");

const words = [
  "Qubix Studios",
  "Qubix Interactive",
  "Qubix Network"
];

let index = 0;

function rotateText() {
  if (!changingText) return;

  changingText.style.opacity = "0";
  changingText.style.transform = "translateY(12px)";

  setTimeout(() => {
    changingText.textContent = words[index];
    changingText.style.opacity = "1";
    changingText.style.transform = "translateY(0)";
    index = (index + 1) % words.length;
  }, 250);
}

rotateText();
setInterval(rotateText, 2400);