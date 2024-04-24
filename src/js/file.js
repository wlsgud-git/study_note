import { fetching } from "./main.js";

class Fi {
  constructor() {}

  async createFile(info) {
    let data = await fetching("/file", {
      method: "post",
      body: JSON.stringify(info),
    });
    return data;
  }

  // async deleteFile(id) {
  //   await fetching(`/file/${id}`, {
  //     method: "delete",
  //   }).then((data) => {});
  // }

  // async RenameFile(id, name) {
  //   const data = await fetching(`/file/${id}`, {
  //     method: "put",
  //     body: JSON.stringify({ name }),
  //   });
  //   return data;
  // }
}

export const fi = new Fi();

// 디스플레이
export function file_display(id, data) {
  const li = document.createElement("li");
  li.className = "stp_file_li";
  li.innerHTML = `
    <!-- 파일 기능 부분 -->
    <div class="stp_func_file_box hide">
      <button class="file_func_btn">rename</button>
      <button class="file_func_btn">delete</button>
    </div>
  
    <!-- 파일 이름변경 부분 -->
    <div class="stp_file_rename_box hide">
      <form action="#" method="post" class="stp_file_rename_form">
        <input
          type="text"
          class="stp_file_rename_input"
          spellcheck="false"
        />
      </form>
    </div>
    <!-- 파일 메인부분 -->
    <div class="stp_file_main_box">
      <button class="stp_file_li_btn">
        <div class="stp_file_name">
          ${data.name}
        </div>
      </button>
    </div>`;
  // 이벤트 부분
  const FileBtn = li.querySelector(".stp_file_li_btn");
  const FileFuncBox = li.querySelector(".stp_func_file_box");

  FileBtn.addEventListener("mousedown", (e) => {
    e.which == 3
      ? FileFuncBox.classList.remove("hide")
      : FileFuncBox.classList.add("hide");

    if (e.which == 1) {
    }
  });

  FileBtn.addEventListener("blur", () => FileFuncBox.classList.add("hide"));

  return li;
}

// 메모 이벤트
