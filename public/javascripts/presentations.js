const $btnDetails = document.querySelectorAll(".btn-details");
const $details = document.querySelectorAll(".details");
console.log($btnDetails);

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
