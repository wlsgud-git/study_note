import { fol } from "./folder.js";
// 다른 이벤트
export async function fetching(url, options) {
  let data;
  const res = await fetch(`http://localhost:3000${url}`, {
    ...options,
    headers: {
      "Content-type": "application/json",
      ...options.headers,
    },
  });

  try {
    data = await res.json();
  } catch (err) {
    console.log(err);
  }

  if (res.status >= 200 && res.status <= 299) {
    return data;
  } else {
    alert("error");
  }
}

window.oncontextmenu = function () {
  return false; // cancel default menu
};

function init() {
  fol.getFolder();
}

init();
