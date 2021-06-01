const $btnDetails = document.querySelectorAll(".btn-details");
const $details = document.querySelectorAll(".details");
console.log($btnDetails);
window.onload = () => {
  $btnDetails.forEach((btnDetail) => {
    let currentDetail = $details.find((detail) => details);
    console.log(currentDetail);
    // $details.forEach((detail) => {
    //   if (detail.dataset.id === btnDetail.dataset.id) {
    //     detail.classList.remove("hide");
    //   } else {
    //     if (!detail.classList.contains("hide")) {
    //       detail.classList.add("hide");
    //     }
    //   }
    // });
  });
};
