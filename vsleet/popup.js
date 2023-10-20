async function initPopupWindow() {
  const site = document.getElementById("site");
  const input = document.getElementById("input");
  const button = document.getElementById("button");

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.url) {
    let url = new URL(tab.url);
    const cookies = await chrome.cookies.getAll({ domain: url.hostname });
    site.textContent = `Cookies for ${url.hostname}`;
    let cookieString = "";
    cookies.forEach((cookie) => {
      cookieString += `${cookie.name}=${cookie.value};`;
    });
    input.value = cookieString;
  }

  button.addEventListener("click", () => {
    const text = input.value;
    navigator.clipboard.writeText(text);
    button.value = "Copied!";
    setTimeout(() => {
      button.value = "Copy Cookies";
    }, 2000);
  });
}

document.addEventListener("DOMContentLoaded", initPopupWindow);
