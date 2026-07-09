const RARITY_WEIGHTS = {
  common: 70,
  rare: 25,
  legendary: 5,
};

const paperAssets = {
  common: "assets/kupala-paper.png",
  rare: "assets/kupala-paper-rare.png",
  legendary: "assets/kupala-paper-rare.png",
};

const iconMap = {
  fern: "✦",
  coffee: "☕",
  scroll: "▤",
  deadline: "✓",
  star: "★",
};

const predictions = [
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "День маленькой победы",
    text: "Сегодня одна из задач решится быстрее, чем ты ожидаешь.",
    bonus: ["+3 к уверенности"],
    icon: "scroll",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Благосклонность кофейных духов",
    text: "Кофе сегодня окажется особенно удачным и поможет пережить даже самое подозрительное совещание.",
    bonus: ["Энергия восстановлена"],
    icon: "coffee",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Спокойный рабочий поток",
    text: "День окажется легче, чем кажется утром. Не торопись пугаться списка задач.",
    bonus: ["-2 к стрессу"],
    icon: "fern",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Удачный разговор",
    text: "Сегодня подходящий день, чтобы задать вопрос, предложить идею или просто хорошо поговорить с коллегами.",
    bonus: ["Навык общения +3"],
    icon: "star",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Найденная мысль",
    text: "Полезная идея придёт неожиданно. Лучше сразу её записать.",
    bonus: ["Креативность +4"],
    icon: "scroll",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Сила перерыва",
    text: "Небольшая пауза поможет решить больше, чем ещё один час напряжённой работы.",
    bonus: ["Ресурсы восстановлены"],
    icon: "coffee",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Тайный союзник",
    text: "Кто-то из коллег сегодня незаметно облегчит тебе жизнь.",
    bonus: ["Командный бонус активирован"],
    icon: "fern",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Чистый почтовый ящик",
    text: "Сегодня есть шанс закрыть неприятное письмо или задачу, которая давно висела в ожидании.",
    bonus: ["Inbox Anxiety -3"],
    icon: "deadline",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Правильное решение",
    text: "Интуиция подскажет верный путь даже там, где инструкция выглядит загадочно.",
    bonus: ["Интуиция +2"],
    icon: "star",
  },
  {
    rarity: "common",
    label: "COMMON PREDICTION",
    title: "Добрый знак",
    text: "В ближайшее время произойдёт маленькое, но очень приятное событие.",
    bonus: ["Настроение +5"],
    icon: "fern",
  },
  {
    rarity: "rare",
    label: "RARE PREDICTION",
    title: "Редкий день без суеты",
    text: "Сегодня окружающий хаос неожиданно обойдёт тебя стороной.",
    bonus: ["Спокойствие +5", "Защита от срочных задач"],
    icon: "fern",
  },
  {
    rarity: "rare",
    label: "RARE PREDICTION",
    title: "Магия закрытого дедлайна",
    text: "Задача, которую хотелось отложить навсегда, наконец будет завершена.",
    bonus: ["Achievement Unlocked"],
    icon: "deadline",
  },
  {
    rarity: "rare",
    label: "RARE PREDICTION",
    title: "Благословение офисного папоротника",
    text: "Сегодня тебя заметит удача. Возможно, она придёт в виде хорошей новости, похвалы или вкусного угощения.",
    bonus: ["Luck +7"],
    icon: "fern",
  },
  {
    rarity: "rare",
    label: "RARE PREDICTION",
    title: "Тайный запас энергии",
    text: "Во второй половине дня внезапно появятся силы на то, что раньше делать совсем не хотелось.",
    bonus: ["Energy restored to 100%"],
    icon: "coffee",
  },
  {
    rarity: "rare",
    label: "RARE PREDICTION",
    title: "Приятный сюрприз",
    text: "Сегодняшний день хранит небольшую неожиданность. Не исключено, что съедобную.",
    bonus: ["Шанс на вкусное: повышен"],
    icon: "star",
  },
  {
    rarity: "legendary",
    label: "LEGENDARY OFFICE PROPHECY",
    title: "Цветок офисного папоротника",
    text: "Ты нашёл редчайший знак Иванова дня. Сегодня удача будет особенно благосклонна к твоим идеям.",
    bonus: ["Luck +10", "Confidence +10", "Stress immunity activated"],
    icon: "fern",
  },
  {
    rarity: "legendary",
    label: "LEGENDARY OFFICE PROPHECY",
    title: "Легендарный рабочий день",
    text: "Все нужные люди ответят, техника не подведёт, а задачи будут закрываться почти самостоятельно.",
    bonus: ["Productivity +15", "Critical Success"],
    icon: "star",
  },
  {
    rarity: "legendary",
    label: "LEGENDARY OFFICE PROPHECY",
    title: "Великая купальская премия",
    text: "Офисные духи не могут обещать денежную награду, но настоятельно рекомендуют ждать приятных новостей.",
    bonus: ["Financial optimism +10"],
    icon: "scroll",
  },
];

const loadingCard = document.querySelector("#loadingCard");
const fortuneButton = document.querySelector("#fortuneButton");
const statusText = document.querySelector("#statusText");
const paperShell = document.querySelector("#paperShell");
const paperImage = document.querySelector("#paperImage");
const predictionCard = document.querySelector("#predictionCard");
const predictionLabel = document.querySelector("#predictionLabel");
const predictionIcon = document.querySelector("#predictionIcon");
const predictionTitle = document.querySelector("#predictionTitle");
const predictionText = document.querySelector("#predictionText");
const predictionBonus = document.querySelector("#predictionBonus");

let lastPredictionIndex = -1;
let isReading = false;

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

fortuneButton?.addEventListener("click", () => {
  if (isReading) {
    return;
  }

  readOfficeFate();
});

function readOfficeFate() {
  isReading = true;
  fortuneButton.disabled = true;
  fortuneButton.textContent = "Ищем знак...";
  statusText.textContent = "Офисные духи советуются...";
  document.body.classList.add("is-reading");
  paperShell.classList.remove("is-visible");
  paperShell.classList.add("is-rolling");

  window.setTimeout(() => {
    const predictionIndex = getRandomPredictionIndex();
    const prediction = predictions[predictionIndex];
    lastPredictionIndex = predictionIndex;
    renderPrediction(prediction);

    paperShell.classList.remove("is-rolling");
    paperShell.classList.add("is-visible");
    document.body.classList.remove("is-reading");
    fortuneButton.disabled = false;
    fortuneButton.textContent = "Получить ещё один знак";
    statusText.textContent = "Предсказание разблокировано.";
    isReading = false;
    paperShell.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 1100);
}

function getRandomPredictionIndex() {
  const rarity = getWeightedRarity();
  const pool = predictions
    .map((prediction, index) => ({ prediction, index }))
    .filter(({ prediction, index }) => {
      return prediction.rarity === rarity && index !== lastPredictionIndex;
    });

  const fallbackPool = predictions
    .map((prediction, index) => ({ prediction, index }))
    .filter(({ index }) => index !== lastPredictionIndex);

  const availablePool = pool.length > 0 ? pool : fallbackPool;
  const randomItem = availablePool[Math.floor(Math.random() * availablePool.length)];

  return randomItem.index;
}

function getWeightedRarity() {
  const totalWeight = Object.values(RARITY_WEIGHTS).reduce((sum, weight) => {
    return sum + weight;
  }, 0);
  let roll = Math.random() * totalWeight;

  for (const [rarity, weight] of Object.entries(RARITY_WEIGHTS)) {
    if (roll < weight) {
      return rarity;
    }

    roll -= weight;
  }

  return "common";
}

function renderPrediction(prediction) {
  paperImage.src = paperAssets[prediction.rarity] ?? paperAssets.common;
  predictionCard.classList.remove("common", "rare", "legendary");
  predictionCard.classList.add(prediction.rarity);
  predictionLabel.textContent = prediction.label;
  predictionIcon.textContent = iconMap[prediction.icon] ?? "✦";
  predictionTitle.textContent = prediction.title;
  predictionText.textContent = prediction.text;
  predictionBonus.replaceChildren(
    ...prediction.bonus.map((bonusText) => {
      const item = document.createElement("li");
      item.textContent = bonusText;
      return item;
    }),
  );
}

function hideMissingPaperImage() {
  paperImage.classList.add("is-missing");
  paperShell.classList.remove("has-paper");
}

function showLoadedPaperImage() {
  paperImage.classList.remove("is-missing");
  paperShell.classList.add("has-paper");
}
