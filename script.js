const paperAssets = {
  common: "assets/kupala-paper.png",
  rare: "assets/kupala-paper-rare.png",
  legendary: "assets/kupala-paper-legendary.png",
};

const iconMap = {
  fern: "✦",
  coffee: "☕",
  scroll: "▤",
  deadline: "✓",
  star: "★",
};

const dataSource = window.KUPALA_PREDICTIONS ?? {};
const predictions = Array.isArray(dataSource.predictions) ? dataSource.predictions : [];
const loadingCard = document.querySelector("#loadingCard");
const calendarScreen = document.querySelector("#calendarScreen");
const fortuneScreen = document.querySelector("#fortuneScreen");
const showFortunesButton = document.querySelector("#showFortunesButton");
const showCalendarButton = document.querySelector("#showCalendarButton");
const fortuneButton = document.querySelector("#fortuneButton");
const repeatButton = document.querySelector("#repeatButton");
const statusText = document.querySelector("#statusText");
const resultStage = document.querySelector("#resultStage");
const paperShell = document.querySelector("#paperShell");
const paperImage = document.querySelector("#paperImage");
const predictionCard = document.querySelector("#predictionCard");
const predictionContent = document.querySelector("#predictionContent");
const predictionLabel = document.querySelector("#predictionLabel");
const predictionIcon = document.querySelector("#predictionIcon");
const predictionTitle = document.querySelector("#predictionTitle");
const predictionText = document.querySelector("#predictionText");
const predictionBonus = document.querySelector("#predictionBonus");

let lastPredictionId = null;
let isReading = false;
let readRequestId = 0;

window.setTimeout(() => {
  loadingCard?.classList.add("is-hidden");
}, 1350);

paperImage?.addEventListener("error", () => {
  hideMissingPaperImage();
});

paperImage?.addEventListener("load", () => {
  showLoadedPaperImage();
});

if (paperImage?.complete && paperImage.naturalWidth === 0) {
  hideMissingPaperImage();
}

if (paperImage?.complete && paperImage.naturalWidth > 0) {
  showLoadedPaperImage();
}

showFortunesButton?.addEventListener("click", showFortunes);
showCalendarButton?.addEventListener("click", showCalendar);
fortuneButton?.addEventListener("click", readOfficeFate);
repeatButton?.addEventListener("click", readOfficeFate);
window.addEventListener("resize", () => {
  if (paperShell.classList.contains("is-visible")) {
    fitPredictionText();
  }
});

if (predictions.length === 0) {
  disableFortuneButtons();
  statusText.textContent = "Предсказания пока не найдены.";
}

showCalendar();

function showCalendar() {
  readRequestId += 1;
  calendarScreen?.classList.add("is-active");
  fortuneScreen?.classList.remove("is-active");
  document.body.classList.add("is-calendar");
  document.body.classList.remove("is-fortunes", "has-result", "is-reading");
  resultStage.classList.remove("has-result");
  paperShell.classList.remove("is-visible", "is-rolling");
  setReadingState(false);
}

function showFortunes() {
  calendarScreen?.classList.remove("is-active");
  fortuneScreen?.classList.add("is-active");
  document.body.classList.remove("is-calendar", "has-result", "is-reading");
  document.body.classList.add("is-fortunes");
  resultStage.classList.remove("has-result");
  paperShell.classList.remove("is-visible", "is-rolling");
  setReadingState(false);
  statusText.textContent =
    predictions.length === 0 ? "Предсказания пока не найдены." : "Магический канал свободен.";
}

function readOfficeFate() {
  if (isReading || predictions.length === 0) {
    return;
  }

  setReadingState(true);
  const currentRequestId = readRequestId + 1;
  readRequestId = currentRequestId;
  statusText.textContent = "Офисные духи советуются...";
  document.body.classList.add("is-reading");
  paperShell.classList.remove("is-visible");
  paperShell.classList.add("is-rolling");

  window.setTimeout(() => {
    if (currentRequestId !== readRequestId) {
      return;
    }

    const prediction = getRandomPrediction();
    lastPredictionId = prediction.id;
    renderPrediction(prediction);

    paperShell.classList.remove("is-rolling");
    paperShell.classList.add("is-visible");
    resultStage.classList.add("has-result");
    document.body.classList.add("has-result");
    document.body.classList.remove("is-reading");
    setReadingState(false);
    statusText.textContent = "Предсказание разблокировано.";
    resultStage.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 1100);
}

function setReadingState(isActive) {
  isReading = isActive;
  const shouldDisable = isActive || predictions.length === 0;
  fortuneButton.disabled = shouldDisable;
  repeatButton.disabled = shouldDisable;
  fortuneButton.textContent = isActive ? "Ищем знак..." : "Получить предсказание";
  repeatButton.textContent = isActive ? "Ищем знак..." : "Получить ещё один знак";
}

function disableFortuneButtons() {
  fortuneButton.disabled = true;
  repeatButton.disabled = true;
}

function getRandomPrediction() {
  const availablePredictions = predictions.filter((prediction) => {
    return prediction.id !== lastPredictionId;
  });
  const pool = availablePredictions.length > 0 ? availablePredictions : predictions;

  return pool[Math.floor(Math.random() * pool.length)];
}

function renderPrediction(prediction) {
  const rarity = prediction.rarity ?? "common";
  const paperAsset = prediction.paperAsset ?? paperAssets[rarity] ?? paperAssets.common;

  paperImage.src = paperAsset;
  predictionCard.classList.remove("common", "rare", "legendary", "fit-compact", "fit-tight");
  predictionCard.classList.add(rarity);
  paperShell.classList.remove("paper-common", "paper-rare", "paper-legendary");
  paperShell.classList.add(`paper-${rarity}`);
  predictionLabel.textContent = getRarityLabel(prediction);
  predictionIcon.textContent = getPredictionIcon(prediction);
  predictionTitle.textContent = prediction.title;
  predictionText.textContent = prediction.text;
  predictionBonus.replaceChildren(
    ...prediction.bonus.map((bonusText) => {
      const item = document.createElement("li");
      item.textContent = bonusText;
      return item;
    }),
  );
  window.requestAnimationFrame(fitPredictionText);
}

function fitPredictionText() {
  predictionCard.classList.remove("fit-compact", "fit-tight");

  if (!predictionContent) {
    return;
  }

  window.requestAnimationFrame(() => {
    if (isPredictionContentOverflowing()) {
      predictionCard.classList.add("fit-compact");
    }

    window.requestAnimationFrame(() => {
      if (isPredictionContentOverflowing()) {
        predictionCard.classList.add("fit-tight");
      }
    });
  });
}

function isPredictionContentOverflowing() {
  const cardBox = predictionCard.getBoundingClientRect();
  const contentBox = predictionContent.getBoundingClientRect();
  const bonusBox = predictionContent.querySelector(".bonus-box")?.getBoundingClientRect();
  const repeatBox = repeatButton?.getBoundingClientRect();
  const paperBox = paperShell.getBoundingClientRect();
  const safeButtonGap = Math.min(Math.max(window.innerHeight * 0.035, 24), 44);
  const bonusBottomLimit = predictionCard.classList.contains("legendary")
    ? cardBox.bottom - cardBox.height * 0.07
    : cardBox.bottom;

  return (
    predictionContent.scrollHeight > predictionContent.clientHeight + 1 ||
    predictionContent.scrollWidth > predictionContent.clientWidth + 1 ||
    contentBox.top < cardBox.top ||
    contentBox.bottom > cardBox.bottom ||
    contentBox.left < cardBox.left ||
    contentBox.right > cardBox.right ||
    (bonusBox && bonusBox.bottom > bonusBottomLimit) ||
    (repeatBox && repeatBox.top - paperBox.bottom < safeButtonGap)
  );
}

function getRarityLabel(prediction) {
  if (!prediction.rarityRu) {
    return "Предсказание";
  }

  return prediction.rarityRu.charAt(0).toUpperCase() + prediction.rarityRu.slice(1);
}

function getPredictionIcon(prediction) {
  if (prediction.icon && iconMap[prediction.icon]) {
    return iconMap[prediction.icon];
  }

  if (prediction.rarity === "legendary") {
    return iconMap.fern;
  }

  if (prediction.rarity === "rare") {
    return iconMap.star;
  }

  return iconMap.scroll;
}

function hideMissingPaperImage() {
  paperImage.classList.add("is-missing");
  paperShell.classList.remove("has-paper");
}

function showLoadedPaperImage() {
  paperImage.classList.remove("is-missing");
  paperShell.classList.add("has-paper");
}
