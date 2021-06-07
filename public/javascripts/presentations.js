///// Users block
const $users = document.querySelector(".users");
const nbPageUsers = document.querySelector(".pagination-users").dataset.nbpage;
let currentPageUsers = 1;
const $btnPagesUsers = document.querySelectorAll(".btn-page-users");
const $btnPaginLessUsers = document.querySelector(".btn-less-page-users");
const $btnPaginMoreUsers = document.querySelector(".btn-more-page-users");
let $btnDetails, $details;

function set$details() {
  $btnDetails = document.querySelectorAll(".btn-details");
  $details = document.querySelectorAll(".details");
}
function changeUsersBlock(newData) {
  $users.innerHTML = "";
  newData.map((userData) => {
    let $userblock = document.createElement("div");
    $userblock.classList.add("user-block");
    let messageNoContact = "Cet utilisateur ne souhaite pas divulgué son contact";
    let inner = `<div class="user-title">
    <img class="title avatar" src="${userData.avatar}" alt="avatar" />
    <h2 class="title name">${userData.name}</h2>
    <img
    class="title btn-details"
    src="/images/userDetails.png"
    alt="ico details"
    data-id="${userData._id}"
    />
  </div>
  <div class="details hide" data-id="${userData._id}">
  <div class="activity">
  <h3>Activités sur le forum:</h3>
      <p>Post: ${userData.nbPost} Fonction: ${userData.nbFun}</p>
    </div>
    <div class="description">
      <h3>Description:</h3>
      <p>${userData.descriptions}</p>
      </div>
      <div class="contact">
      <h3>Contact:</h3>
      <p>${userData.publicContact ? userData.email : messageNoContact}</p>
      </div>`;
    $userblock.innerHTML = inner;
    $users.appendChild($userblock);
  });
  set$details();
  addEventDetails();
}
//////// PAGINATION process make event on button then update button
function toggleActive($toActive) {
  $btnPagesUsers.forEach((el) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    }
    if (el.textContent === $toActive.textContent) {
      el.classList.add("active");
    }
  });
}
function setPagination() {
  if ($btnPagesUsers.length > 0) {
    $btnPagesUsers.forEach(($btnpage) => {
      let page = $btnpage.textContent;
      $btnpage.onclick = () => {
        toggleActive($btnpage);
        axios
          .get(`/forum/home?page=${page}&limit=4&data=users`)
          .then((dataPage) => {
            console.log(dataPage);
            changeUsersBlock(dataPage.data.users);
            currentPageUsers = Number(page);
          })
          .catch((err) => console.log(err));
      };
    });
  }
}

function addEventDetails() {
  $btnDetails.forEach((btnDetail) => {
    btnDetail.onclick = () => {
      $details.forEach((detail) => {
        if (detail.dataset.id === btnDetail.dataset.id) {
          detail.classList.toggle("hide");
        } else {
          if (!detail.classList.contains("hide")) {
            detail.classList.add("hide");
          }
        }
      });
    };
  });
}
function addEvent$paginMoreLess() {
  if ($btnPaginLessUsers.length === 0) return;
  $btnPaginLessUsers.onclick = () => {
    if ($btnPagesUsers[0].textContent === "1") return;
    for (let i = 0; i < $btnPagesUsers.length; i++) {
      const element = $btnPagesUsers[i];
      let newNbpage = Number(element.textContent) - 1;
      element.textContent = newNbpage;
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      } else {
        if (newNbpage === currentPageUsers) $btnPagesUsers[i].classList.add("active");
      }
      set$details();
      setPagination();
    }
  };

  $btnPaginMoreUsers.onclick = () => {
    if ($btnPagesUsers[$btnPagesUsers.length - 1].textContent === nbPageUsers) return;
    for (let i = 0; i < $btnPagesUsers.length; i++) {
      const element = $btnPagesUsers[i];
      let newNbpage = Number(element.textContent) + 1;
      element.textContent = newNbpage;
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      } else {
        if (newNbpage === currentPageUsers) $btnPagesUsers[i].classList.add("active");
      }
      set$details();
      setPagination();
    }
  };
}

/// launch process
set$details();
addEventDetails();
setPagination();
addEvent$paginMoreLess();
