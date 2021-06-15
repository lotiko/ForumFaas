let str = "la super demo";
let nb = 10;
let arr = ["Génial", "ouf", "de la balle", "cool"];
let obj = { "eyes": ";", "nose": "o", "mouth": ")" }

function demo(str1, nb1, arr1, obj1) {
  
  let i = 0;
  let exclam = "!";
  str1 = str1.split('').map(letter => {
    if(str1[i-1] && str1[i-1] === " ") {
      i++;
      return letter.toUpperCase();
    } else if(str1[i] === " ") {
      i++;
      return "";
    }else {
      i++;
      return letter;
    }
  }).join('');
  let wahou = "Wahou"+exclam.repeat(nb1);
  let randomSuper = arr1[Math.floor(Math.random()*arr1.length)];
  let smile = obj1.eyes+obj1.nose+obj1.mouth;
  let objRet = {
    title: str1,
    start: wahou,
    middle: randomSuper,
    end: smile
  }
  objRet.phrase = objRet.title + " => " + objRet.start + " C'est " + objRet.middle + "." + " " + objRet.end;
  
  return objRet;
}
console.log(demo(str, nb, arr, obj));