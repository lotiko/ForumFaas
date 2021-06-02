const $nbArgs = document.querySelector(".nb-args");
const $arg = document.querySelector(".arg");
const $argInputs = document.querySelector(".args-input");

$nbArgs.onchange = () => {
  // on vide les inputs et on cache l'input de base qui va étre cloner
  $argInputs.innerHTML = "";
  $arg.hidden = true;
  // si pas d'argument fin process
  let nbInput = Number($nbArgs.value);
  if (nbInput === 0) return;
  // sinon on montre l'input de base et insert des clone de ce dernier en fonction du nombre d'arguments demandé
  $arg.hidden = false;
  let i = 2;
  while (i <= nbInput) {
    // on insére une virgule entre les inputs
    const $spanComa = document.createElement("span");
    $spanComa.textContent = ",";
    $argInputs.appendChild($spanComa);
    const $newinput = $arg.cloneNode();
    $argInputs.appendChild($newinput);
    i++;
  }
};
