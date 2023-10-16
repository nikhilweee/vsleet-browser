const site = document.getElementById("site");
const form = document.getElementById("form");

async function initPopupWindow() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab?.url) {
    let url = new URL(tab.url);
    const cookies = await chrome.cookies.getAll({ domain: url.hostname });
    site.textContent = `Cookies for ${url.hostname}`;
    cookies.forEach((cookie) => {
      const div = document.createElement("p");
      div.innerHTML = `
      <label for="input-${cookie.name}">${cookie.name}</label>
      <input id="input-${cookie.name}" value="${cookie.value}"></input>`;
      form.appendChild(div);
    });
    console.log(cookies);
  }
}

initPopupWindow();
