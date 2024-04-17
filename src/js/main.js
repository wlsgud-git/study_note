// const ContentForm = document.querySelector(".");
// const ContentTitle = document.querySelector(".");
// const ContentBody = document.querySelector(".");
// const ContentDelete = document.querySelector(".");
// const ContentFocusBtn = document.querySelector(".");

const FolderAdd = document.querySelector(".stp_folder_add_btn");
const FolderAddForm = document.querySelector(".stp_folder_add_form");
const FolderAddBox = document.querySelector(".stp_folder_add_section");
const FolderAddName = document.querySelector(".stp_folder_name_input");
// const FolderList = document.querySelector(".");
// const FolderDelete = document.querySelector(".");
// const FolderModify = document.querySelector(".");

FolderAdd.addEventListener("click", () => {
  FolderAddBox.classList.remove("hide");
  FolderAddName.focus();
});

FolderAddName.addEventListener("focusout", () => {});
