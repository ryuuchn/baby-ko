
const screens = [...document.querySelectorAll(".screen")];

const music = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const video = document.getElementById("surpriseVideo");
const videoCard = document.getElementById("videoCard");
const hugGif = document.getElementById("hugGif");
const gifCaption = document.getElementById("gifCaption");
const hugMessage = document.getElementById("hugMessage");

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "memories") {
    playVideo();
  } else if (video) {
    video.pause();
  }
}

async function playVideo() {
  if (!video) return;

  video.muted = true;
  video.currentTime = 0;

  try {
    await video.play();
  } catch (error) {
    console.log("Video autoplay failed:", error);
  }
}

document.getElementById("openLetter").addEventListener("click", async () => {
  showScreen("letter");

  try {
    await music.play();
    musicButton.textContent = "♫ music: on";
  } catch (error) {
    musicButton.textContent = "♫ music: off";
  }
});

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.next);
  });
});

document.getElementById("hugButton").addEventListener("click", () => {
  hugGif.hidden = false;
  gifCaption.hidden = false;
  hugMessage.textContent = "sana mafeel mo hug ko baby ko";

  for (let i = 0; i < 18; i++) {
    makeHeart();
  }
});

document.getElementById("restart").addEventListener("click", () => {
  hugGif.hidden = true;
  gifCaption.hidden = true;
  hugMessage.textContent = "";

  showScreen("cover");
});

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "♫ music: on";
    } catch (error) {
      musicButton.textContent = "♫ music: off";
    }
  } else {
    music.pause();
    musicButton.textContent = "♫ music: off";
  }
});

if (video) {
  video.addEventListener("error", () => {
    if (videoCard) {
      videoCard.style.display = "none";
    }
  });
}

function makeHeart() {
  const heart = document.createElement("span");

  heart.className = "heart";
  heart.textContent = Math.random() > 0.5 ? "♡" : "♥";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.animationDuration = (7 + Math.random() * 7) + "s";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 15000);
}

setInterval(makeHeart, 1100);
