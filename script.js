const bootLog = document.getElementById("bootLog");
const bootProgress = document.getElementById("bootProgress");
const bootPercent = document.getElementById("bootPercent");
const bootScreen = document.getElementById("bootScreen");
const pageRoot = document.getElementById("pageRoot");

const bootLines = [
  "[OK] Power rails online",
  "[OK] GPU lights synchronized",
  "[OK] Memory timing calibrated",
  "[OK] Network uplink secured",
  "[OK] Launcher initialized",
  "[DONE] Red system online"
];

let progress = 0;
let lineIndex = 0;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealPage = () => {
  bootScreen.classList.add("hidden");
  pageRoot.classList.add("ready");
};

const addLine = () => {
  if (lineIndex >= bootLines.length) return;
  const line = document.createElement("p");
  line.textContent = bootLines[lineIndex];
  line.style.margin = "0";
  line.style.opacity = "0";
  line.style.transform = "translateY(4px)";
  line.style.transition = "all 200ms ease";
  bootLog.appendChild(line);
  requestAnimationFrame(() => {
    line.style.opacity = "1";
    line.style.transform = "translateY(0)";
  });
  lineIndex += 1;
};

const tick = () => {
  progress = Math.min(progress + Math.ceil(Math.random() * 8), 100);
  bootProgress.style.width = `${progress}%`;
  bootPercent.textContent = String(progress);

  if (progress % 16 < 8) {
    document.documentElement.style.setProperty("--flicker", "0.88");
  } else {
    document.documentElement.style.setProperty("--flicker", "1");
  }

  if (lineIndex < bootLines.length) addLine();

  if (progress >= 100) {
    setTimeout(() => {
      revealPage();
    }, 260);
    return;
  }

  setTimeout(tick, 170);
};

let shouldSkipBoot = prefersReducedMotion;

try {
  if (sessionStorage.getItem("red_boot_seen") === "1") {
    shouldSkipBoot = true;
  } else {
    sessionStorage.setItem("red_boot_seen", "1");
  }
} catch {
  // Session storage can be unavailable in some privacy contexts.
}

if (shouldSkipBoot) {
  bootProgress.style.width = "100%";
  bootPercent.textContent = "100";
  revealPage();
} else {
  setTimeout(tick, 250);
}
