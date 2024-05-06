import { fetching } from "./main.js";
import { fileDisplay, fi } from "./file.js";
// import { InsertSearch } from "../../utils/algo.js";

const FolderAdd = document.querySelector(".stp_folder_add_btn");
const FolderAddForm = document.querySelector(".stp_folder_add_form");
const FolderAddBox = document.querySelector(".stp_folder_add_section");
const FolderAddName = document.querySelector(".stp_folder_name_input");
const FolderListBox = document.querySelector(".stp_folder_container_box");

export function InsertSearch(data, t) {
  if (data.length == 0) return -1;

  let left = 0;
  let right = data.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let compare = data[mid].name;

    if (mid == 0 && t < compare) {
      return -1;
    }

    if (t < compare) right = mid - 1;
    else left = mid + 1;
  }
  return left;
}

export function listRerender(parentNode, childNode, newName) {
  let parentArr = parentNode.children;
  let result = InsertSearch(parentArr, newName);

  parentNode.insertBefore(
    childNode,
    result == -1
      ? parentNode.firstChild
      : parentArr[result - 1].nextElementSibling
  );
}

// 폴더와 메모 클래스
class Folder {
  constructor() {}

  async getFolder() {
    await fetching("/folder", { method: "get" }).then((info) => {
      info.list.map((li, idx) => {
        FolderListBox.appendChild(folderDisplay(li, idx));
      });
    });

    return;
  }

  async createfolder(e) {
    let name = FolderAddName.value;
    e.preventDefault();

    if (name == "") {
      FolderAddBox.classList.add("hide");
      return;
    }

    await fetching("/folder", {
      method: "post",
      body: JSON.stringify({ name }),
    }).then((data) => {
      listRerender(FolderListBox, folderDisplay(data.info[0]), name);
    });

    FolderAddName.value = "";
    FolderAddBox.classList.add("hide");
  }

  async deleteFolder(id) {
    await fetching(`/folder/${id}`, {
      method: "delete",
    }).then((data) => {});
  }

  async RenameFolder(id, name) {
    const data = await fetching(`/folder/${id}`, {
      method: "put",
      body: JSON.stringify({ name }),
    });
    return data;
  }
}

export const fol = new Folder();

function folderDisplay(data) {
  const memo = data.memo;

  const li = document.createElement("li");
  li.className = "stp_folder_li";
  li.id = data.id;
  li.name = data.name;
  li.innerHTML = `
    <!-- 폴더 기능 부분 -->
              <div class="stp_func_folder_box hide">
                <button class="folder_func_btn">new file</button>
                <button class="folder_func_btn">rename</button>
                <button class="folder_func_btn">delete</button>
              </div>
  
              <!-- 폴더 이름변경 부분 -->
              <div class="stp_folder_rename_box hide">
                <form action="#" method="post" class="stp_folder_rename_form">
                  <input
                    type="text"
                    value=${data.name}
                    class="stp_folder_rename_input"
                    spellcheck="false"
                  />
                </form>
              </div>
              <!-- 폴더 메인부분 -->
              <div class="stp_folder_main_box">
                <button class="stp_folder_li_btn">
                  <span class="fol_ico"><i class="fa-solid fa-chevron-right"></i></span>
  
                  <div class="stp_folder_name">${data.name}</div>
                </button>
              </div>`;

  const ul = document.createElement("ul");
  ul.className = "stp_file_lists hide";
  ul.innerHTML = `
    <!-- 새파일 추가 부분 -->
    <div class="stp_newfile_box hide">
      <form action="#" method="post" class="stp_newfile_form">
        <input
          type="text"
          class="stp_newfile_input"
          spellcheck="false"
        />
      </form>
    </div>
    `;

  li.appendChild(ul);

  if (memo) ul.appendChild(fileDisplay(memo, "ul"));
  // --------------------------------------------------------------------------------
  // 이벤트 처리부분
  const FolBtn = li.querySelector(".stp_folder_li_btn");
  const FolBox = li.querySelector(".stp_folder_main_box");
  const FolIco = li.querySelector(".fol_ico");
  const FileBox = li.querySelector(".stp_file_lists");

  // 기능부분
  const FolfuncBox = li.querySelector(".stp_func_folder_box");
  const FolControlBtn = li.querySelectorAll(".folder_func_btn");

  // 폴더 마우스 이벤트
  FolBtn.addEventListener("mousedown", (e) => {
    e.which == 3
      ? FolfuncBox.classList.remove("hide")
      : FolfuncBox.classList.add("hide");

    if (e.which == 1) {
      FileBox.classList.toggle("hide");

      FolIco.children[0].className = FileBox.classList.contains("hide")
        ? "fa-solid fa-chevron-right"
        : "fa-solid fa-chevron-down";
    }
  });
  FolBtn.addEventListener("blur", () => FolfuncBox.classList.add("hide"));

  // 폴더 func 버튼 클릭 부분
  FolControlBtn.forEach((btn) => {
    btn.addEventListener("mousedown", async (e) => {
      e.preventDefault();
      let type = e.target.innerText;

      if (type == "new file") {
        NewFileBox.classList.remove("hide");
        FileBox.classList.remove("hide");
        NewFileInput.focus();
      } else if (type == "rename") {
        FolRenameBox.classList.remove("hide");
        FolBox.classList.add("hide");
        FolRenameInput.focus();
        FolRenameInput.setSelectionRange(
          FolRenameInput.value.length,
          FolRenameInput.value.length
        );
      } else {
        await fol.deleteFolder(li.id).then((ok) => {
          let parent = li.parentNode;
          let index = Array.prototype.indexOf.call(parent.children, li);
          parent.removeChild(parent.childNodes[index]);
        });
      }
    });
  });

  // 새 파일 이벤트
  const NewFileBox = li.querySelector(".stp_newfile_box");
  const NewFileForm = li.querySelector(".stp_newfile_form");
  const NewFileInput = li.querySelector(".stp_newfile_input");

  const FileList = ul.querySelector(".stp_file_list_contaier");

  async function newFileValid(e) {
    e.preventDefault();

    let name = NewFileInput.value;

    if (name == "") {
      NewFileBox.classList.add("hide");
      return;
    }

    await fi
      .createFile({ folder_id: li.id, name })
      .then((data) => {
        console.log(data);
        // listRerender(FileList, fileDisplay() );
      });

    NewFileBox.classList.add("hide");
  }

  NewFileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    NewFileBox.classList.add("hide");
  });
  NewFileForm.addEventListener("focusout", newFileValid);

  // 이름변경 이벤트
  const FolRenameBox = li.querySelector(".stp_folder_rename_box");
  const FolRenameForm = li.querySelector(".stp_folder_rename_form");
  const FolRenameInput = li.querySelector(".stp_folder_rename_input");
  async function renameValid(e) {
    let before = FolBtn.children[1];
    let new_ = FolRenameInput.value;

    if (new_ == "" || new_ == before.innerText) {
      FolRenameInput.value = before.innerText;
    } else {
      await fol.RenameFolder(li.id, new_).then((data) => {
        FolBtn.children[1].innerText = new_;
        listRerender(FolderListBox, li, new_);
      });
    }

    FolRenameBox.classList.add("hide");
    FolBox.classList.remove("hide");
  }

  FolRenameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    FolRenameBox.classList.add("hide");
    FolBox.classList.remove("hide");
  });
  FolRenameForm.addEventListener("focusout", renameValid);

  return li;
}

FolderAddForm.addEventListener("submit", fol.createfolder);
FolderAddForm.addEventListener("focusout", fol.createfolder);

// 폴더추가 버튼 클릭시 폴더추가 창 생김
FolderAdd.addEventListener("click", () => {
  FolderAddBox.classList.remove("hide");
  FolderAddName.focus();
});
