///// Users block
const $users = document.querySelector(".users");
const nbPage = {
  users: document.querySelector(".pagination-users").dataset.nbpage,
  functions: document.querySelector(".pagination-functions").dataset.nbpage,
  answers: document.querySelector(".pagination-answers").dataset.nbpage,
};
console.log(nbPage);

const $btnPages = {
  users: document.querySelectorAll(".btn-page-users"),
  functions: document.querySelectorAll(".btn-page-functions"),
  answers: document.querySelectorAll(".btn-page-answers"),
};
const $btnPaginLess = {
  users: document.querySelector(".btn-less-page-users"),
  functions: document.querySelector(".btn-less-page-functions"),
  answers: document.querySelector(".btn-less-page-answers"),
};
const $btnPaginMore = {
  users: document.querySelector(".btn-more-page-users"),
  functions: document.querySelector(".btn-more-page-functions"),
  answers: document.querySelector(".btn-more-page-answers"),
};
const changeFun = {
  users: changeUsersBlock,
  functions: changeFunctionsBlock,
  answers: changeAnswersBlock,
};
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
function toggleActive($toActive, type) {
  $btnPages[type].forEach((el) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
    }
    if (el.textContent === $toActive.textContent) {
      el.classList.add("active");
    }
  });
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
function addEvent$paginMoreLess(type) {
  console.log(type);
  if ($btnPaginLess[type].length === 0) return;
  $btnPaginLess[type].onclick = () => {
    let newNbpage;
    if ($btnPages[type][0].textContent === "1") return;
    for (let i = 0; i < $btnPages[type].length; i++) {
      const element = $btnPages[type][i];
      newNbpage = Number(element.textContent) - 1;
      element.textContent = newNbpage;
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      } else {
        if (newNbpage === nbPage[type]) $btnPages[type][i].classList.add("active");
      }
    }
    if (type === "users") set$details();

    setPagination(type);
  };

  $btnPaginMore[type].onclick = () => {
    if (Number($btnPages[type][$btnPages[type].length - 1].textContent) === Number(nbPage[type])) return;
     console.log('le nombre de pase',Number($btnPages[type][$btnPages[type].length - 1].textContent),Number(nbPage[type]));
    for (let i = 0; i < $btnPages[type].length; i++) {

      const element = $btnPages[type][i];
      let newNbpage = Number(element.textContent) + 1;
      element.textContent = newNbpage;
      if (element.classList.contains("active")) {
        element.classList.remove("active");
      } else {
        if (newNbpage === nbPage[type]) $btnPages[type][i].classList.add("active");
      }
      if (type === "users") set$details();

      setPagination(type);
    }
  };
}
/// Functions block
const $function = document.querySelector(".funs");
function changeFunctionsBlock(newData) {
  $function.innerHTML = "";
  newData.map((funData) => {
    let $funblock = document.createElement("div");
    $funblock.classList.add("function-block");
    let inner = `<div class="function-title">
    <img class="title avatar" src="${funData.authorData.avatar}" alt="avatar" />
    <h2 class="title name">${funData.name}</h2>
    <a href="/forum/function/${funData._id}"><img
        class="title btn-details-fun"
        src="/images/details.png"
        alt="ico details"
      /></a>
  </div>`;
    $funblock.innerHTML = inner;
    $function.appendChild($funblock);
  });
}
//// answer block
const $answers = document.querySelector(".answ");
function changeAnswersBlock(newData) {
  $answers.innerHTML = "";
  newData.map((answerdata) => {
    let $answerblock = document.createElement("div");
    $answerblock.classList.add("answer-block");
    let inner = `<div class="answer-title">
    <img class="title avatar" src="${answerdata.authorData.avatar}" alt="avatar" />
    <h2 class="title name">${answerdata.title}</h2>
    <a href="/forum/answer/${answerdata._id}"><img
        class="title btn-details-fun"
        src="/images/details.png"
        alt="ico details"
      /></a>
  </div>`;
    $answerblock.innerHTML = inner;
    $answers.appendChild($answerblock);
  });

}
/// utils
function setPagination(type) {
  let $btnToset = $btnPages[type];
  let callback = changeFun[type];
  console.log('notre type', type);
  console.log(type ,$btnToset,callback);
  if ($btnToset.length > 0) {

    $btnToset.forEach(($btnpage) => {
      let page = $btnpage.textContent;
      $btnpage.onclick = () => {
        toggleActive($btnpage, type);
        axios
          .get(`/forum/home?page=${page}&limit=4&data=${type}`)
          .then((dataPage) => {
            console.log(dataPage);
            callback(dataPage.data[type]);
            nbPage[type] = Number(page);
          })
          .catch((err) => console.log(err));
      };
    });
  }
}
/// launch process
set$details();
addEventDetails();
setPagination("users");
setPagination("functions");
setPagination("answers");
if ($btnPaginLess.users) addEvent$paginMoreLess("users");
if ($btnPaginLess.functions) addEvent$paginMoreLess("functions");

if ($btnPaginLess.answers) addEvent$paginMoreLess("answers");