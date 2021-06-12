const $btnTest = document.getElementById("test");
const $inputTest = document.querySelectorAll(".input-test");
const $result = document.querySelector(".result");
const url = document.getElementById("url-exec").textContent;
const $errClient = document.querySelector(".error-client");
console.log($result);
$btnTest.onclick = async function () {
  $errClient.hidden = true;
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
    try {
      let body = {};
      $inputTest.forEach((input) => {
        body[input.name] = JSON.parse(input.value);
        console.log(body[input.name]);
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
        .catch((err) => console.log(err.message));
    } catch (error) {
      if (error instanceof SyntaxError) {
        $errClient.firstChild.textContent = "Les valeurs des argument ne sont pas valide.";
        $errClient.hidden = false;
      }
      console.log(error);
    }
  }
};
