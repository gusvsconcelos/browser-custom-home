function time() {
  const newDate = new Date();
  const formattedDate = newDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const hour = document.getElementById("hour");

  hour.innerHTML = formattedDate.replace(/:/g, '<span class="blink">:</span>');
}

function date() {
  const newDate = new Date();
  const dayOfMonth = newDate.toLocaleDateString("pt-BR");
  const date = document.getElementById("date");

  date.innerHTML = dayOfMonth;
}

async function getQuotes() {
  try {
    const answer = await fetch("https://api.quotable.io/random");
    const data = await answer.json();
    return `${data.content}`;
  } catch (error) {
    console.error("Error retrieving quote:", error);
  }
}

async function quoteOfTheDay() {
  const quoteElement = document.getElementById("quote");
  const quote = await getQuotes();

  quoteElement.textContent = `'${quote}'`;

  if (quote == undefined) {
    quoteElement.textContent =
      "'I know the hatred and envy of your hearts. Ye are not great enough not to know of hatred and envy. Then be great enough not to be ashamed of them.'";
  }
}

function darkTheme() {
  return (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark").matches
  );
}

function updateFavicon() {
  const favicon = document.getElementById("favicon");

  if (darkTheme()) {
    favicon.href = "icons/favicon-white.ico";
  } else {
    favicon.href = "icons/favicon-black.ico";
  }
}

function functionLoader() {
  time();
  date();
  quoteOfTheDay();
  updateFavicon();
}

window.addEventListener("load", functionLoader, true);

setInterval(time, 1000);
