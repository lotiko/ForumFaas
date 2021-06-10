const $btnTest = document.getElementById("test");
const $inputTest = document.querySelectorAll(".input-test");
const $result = document.querySelector(".result");
const url = document.getElementById("url-exec").textContent;
console.log($result);
$btnTest.onclick = async function () {
  // si pas d'argument envoi le résultat
  if ($inputTest.length === 0) {
    console.log(url);
    fetch(url, { method: "POST", cache: "no-cache" })
      .then((ret) => ret.json())
      .then((json) => {
        console.log(json);
        $result.textContent = JSON.stringify(json);
      })
      .catch((err) => console.log(err));
  } else {
    let body = {};
    let value = null;
    $inputTest.forEach((input) => {
      
      body[input.name] = JSON.parse(input.value);
    });
    let bodyToPost = JSON.stringify(body);
    console.log(bodyToPost);
    fetch(url, {
      method: "POST",
      body: bodyToPost,
      headers: { "Content-type": "application/json" },
    })
      .then((ret) => ret.text())
      .then((text) => {
        $result.textContent = text;
        hljs.highlightAll();
        let $spanHljs = document.querySelectorAll(".result > span");
        let indent = "   ";
        let decale = 0;
        $spanHljs.forEach((span) => {
          if (span.classList.contains("hljs-punctuation")) {
            if (span.textContent === "{") {
              decale++;
              span.innerHTML = " {<br/>" + indent.repeat(decale) + "  ";
            }
            if (span.textContent === "}") {
              let space = decale === 1 ? " " : indent.repeat(decale);
              decale--;
              span.innerHTML = "<br/>" + space + "}";
            }
            // if (span.textContent === ",") {
            //   span.innerHTML = ",<br/>" + indent.repeat(decale) + "  ";
            // }
          }
        });
      })
      .catch((err) => console.log(err));
  }
};
