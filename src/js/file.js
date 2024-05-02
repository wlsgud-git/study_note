import { fetching } from "./main.js";

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

  // async ModifyFileBody(){

  // }
}

export const fi = new Fi();

// 디스플레이
export function fileDisplay(list, type) {
  const ul = document.createElement("ul");
  ul.className = "stp_file_list_contaier";

  for (var i = 0; i < list.length; i++) {
    const li = document.createElement("li");
    li.className = "stp_file_li";
    li.id = list[i].id;
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
          ${list[i].name}
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

    ul.appendChild(li);
  }

  return ul;
}

// 메모 이벤트
