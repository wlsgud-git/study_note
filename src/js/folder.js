import { fetching } from "./main.js";
import { file_display, fi } from "./file.js";

const FolderAdd = document.querySelector(".stp_folder_add_btn");
const FolderAddForm = document.querySelector(".stp_folder_add_form");
const FolderAddBox = document.querySelector(".stp_folder_add_section");
const FolderAddName = document.querySelector(".stp_folder_name_input");
const FolderListBox = document.querySelector(".stp_folder_list_ul");

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
      alert("폴더 생성 완료");
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

function folder_display(data) {
  const memo = data.memo;

  const li = document.createElement("li");
  li.className = "stp_folder_li";
  li.id = data.id;
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

  memo.map((info) => ul.appendChild(file_display(data.id, info)));
  // --------------------------------------------------------------------------------
  // 이벤트 처리부분
  const FolBtn = li.querySelector(".stp_folder_li_btn");
  const FolBox = li.querySelector(".stp_folder_main_box");
  const FolIco = li.querySelector(".fol_ico");
  const FileBox = li.querySelector(".stp_file_lists");
  // 기능부분
  const FolfuncBox = li.querySelector(".stp_func_folder_box");
  const FolControlBtn = li.querySelectorAll(".folder_func_btn");
  // 새파일 추가 부분

  // 이름변경  부분
  const FolRenameBox = li.querySelector(".stp_folder_rename_box");
  const FolRenameForm = li.querySelector(".stp_folder_rename_form");
  const FolRenameInput = li.querySelector(".stp_folder_rename_input");

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
    btn.addEventListener("mousedown", (e) => {
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
      }
    });
  });

  // 새파일 추가
  const NewFileBox = li.querySelector(".stp_newfile_box");
  const NewFileForm = li.querySelector(".stp_newfile_form");
  const NewFileInput = li.querySelector(".stp_newfile_input");

  // 새 파일 이벤트
  async function newFileValid(e) {
    e.preventDefault();

    let name = NewFileInput.value;

    if (name == "") {
      NewFileBox.classList.add("hide");
      return;
    }

    await fi
      .createFile({ folder_id: li.id, name, title: "", body: "" })
      .then((data) => {
        console.log("새 파일 생성 완료");
      });

    NewFileBox.classList.add("hide");
  }

  NewFileForm.addEventListener("submit", newFileValid);
  // NewFileForm.addEventListener("focusout", newFileValid);

  // 이름변경 이벤트
  async function renameValid(e) {
    e.preventDefault();

    const before = FolBtn.children[1].innerText;
    const new_ = FolRenameInput.value;

    if (new_ == "" || new_ == before) {
      FolRenameInput.value = before;
    } else {
      await fol.RenameFolder(li.id, new_).then((data) => {
        console.log(data);
      });
    }

    FolRenameBox.classList.add("hide");
    FolBox.classList.remove("hide");
  }

  FolRenameForm.addEventListener("submit", renameValid);
  FolRenameForm.addEventListener("focusout", renameValid);

  // FolRenameInput.add("change", () => {});

  return li;
}

FolderAddForm.addEventListener("submit", fol.createfolder);
FolderAddForm.addEventListener("focusout", fol.createfolder);

// 폴더추가 버튼 클릭시 폴더추가 창 생김
FolderAdd.addEventListener("click", () => {
  FolderAddBox.classList.remove("hide");
  FolderAddName.focus();
});
