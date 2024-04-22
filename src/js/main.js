const FolderAdd = document.querySelector(".stp_folder_add_btn");
const FolderAddForm = document.querySelector(".stp_folder_add_form");
const FolderAddBox = document.querySelector(".stp_folder_add_section");
const FolderAddName = document.querySelector(".stp_folder_name_input");
const FolderListBox = document.querySelector(".stp_folder_list");

// 디스플레이
function file_display(data) {
  const li = document.createElement("li");
  li.className = "stp_file_li";
  li.innerHTML = `
  <div class="stp_file_container">
    <div class="stp_file_func_box hide">
      <button class="file_func">rename</button>
      <button class="file_func">delete</button>
    </div>
    <button class="stp_file_list_btn">
      <span>${data.body}</span>
    </button>
  </div>`;

  const FileListBtn = li.querySelector(".stp_file_list_btn");
  const FileFuncBox = li.querySelector(".stp_file_func_box");

  FileListBtn.addEventListener("mousedown", (e) => {
    e.which == 3
      ? FileFuncBox.classList.remove("hide")
      : FileFuncBox.classList.add("hide");
  });

  FileListBtn.addEventListener("blur", () => FileFuncBox.classList.add("hide"));

  // const list = `
  // <li class="stp_file_li" id='${data.id}'>
  //   <div class="stp_file_container">
  //     <div class="stp_file_func_box hide">
  //       <button class="">new file</button>
  //       <button class="">rename</button>
  //       <button class="">delete</button>
  //     </div>
  //     <button class="stp_file_list_btn">
  //       <span>${data.body}</span>
  //     </button>
  //   </div>
  // </li>
  // `;

  return li;
}

function folder_display(data) {
  const memo = data.memo;

  let li = document.createElement("li");
  li.className = "stp_folder_li";
  li.id = data.id;

  let div = document.createElement("div");
  div.className = "stp_folder_container";
  div.innerHTML = `
  <!-- 오른쪽 클릭시 기능부분 -->
    <div class="stp_folder_func_box hide">
      <button class="folder_func_btn">new file</button>
      <button class="folder_func_btn">rename</button>
      <button class="folder_func_btn">delete</button>
    </div>
    <!-- 폴더 버튼부분 -->
    <button class="stp_folder_list_btn">
      <i class="fa-solid fa-chevron-right"></i>
      <span class="">${data.name}</span>
    </button>
  `;

  let ul = document.createElement("ul");
  ul.className = "stp_file_lists hide";

  memo.map((info) => {
    let file_list = file_display(info);
    ul.appendChild(file_list);
  });

  div.appendChild(ul);
  li.appendChild(div);

  // 폴더 이벤트 부분
  const FolderListBtn = li.querySelector(".stp_folder_list_btn");
  const FolderFuncBox = li.querySelector(".stp_folder_func_box");
  const FolderFuncBtn = li.querySelectorAll(".folder_func_btn");

  const FileListBox = li.querySelector(".stp_file_lists");

  FolderListBtn.addEventListener("mousedown", (e) => {
    e.which == 3
      ? FolderFuncBox.classList.remove("hide")
      : FolderFuncBox.classList.add("hide");

    if (e.which == 1) FileListBox.classList.toggle("hide");
  });

  FolderListBtn.addEventListener("blur", () =>
    FolderFuncBox.classList.add("hide")
  );

  FolderFuncBtn.forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      let type = e.target.innerText;

      if (type == "delete") fol.deleteFolder(li.id);
      else if (type == "rename") fol.RenameFolder(li.id);
      else {
        console.log("new file create!");
      }
    });
  });

  return li;
}

// 폴더와 메모 클래스
class Folder {
  constructor() {}

  async getFolder() {
    let data;
    await fetching("/folder", { method: "get" }).then((info) => {
      data = info.list;
    });

    for (let i = 0; i < data.length; i++) {
      let fo = folder_display(data[i]);
      FolderListBox.appendChild(fo);
    }
  }

  async deleteFolder(id) {
    await fetching(`/folder/${id}`, {
      method: "delete",
    }).then((data) => {
      console.log(data);
    });
  }

  async RenameFolder(id) {}
}

class Memo {
  constructor() {}
}

const fol = new Folder();
const me = new Memo();

async function fetching(url, options) {
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

// // 폴더 이벤트들

// 폴더 추가 이벤트
FolderAddForm.addEventListener("submit", async (e) => {
  let name = FolderAddName.value;
  e.preventDefault();

  await fetching("/folder", {
    method: "post",
    body: JSON.stringify({ name }),
  }).then((data) => {
    console.log(data);
  });

  FolderAddBox.classList.add("hide");
});

// 폴더추가 버튼 클릭시 폴더추가 창 생김
FolderAdd.addEventListener("click", () => {
  FolderAddBox.classList.remove("hide");
  FolderAddName.focus();
});

// 폴더추가 인풋창 포커스 아웃이 이름 있으면 저장 아니면 팅김
FolderAddName.addEventListener("focusout", async () => {
  if (FolderAddName.value == "") {
    FolderAddBox.classList.add("hide");
    return;
  }
});

// 메모 이벤트

// 다른 이벤트
window.oncontextmenu = function () {
  return false; // cancel default menu
};

function init() {
  fol.getFolder();
}

init();
