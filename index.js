const name = document.getElementById("name");
const password = document.getElementById("password");
const form = document.querySelector("form");
const message = document.getElementById("message");
const log = document.getElementById("log");
const template = document.getElementById("template");
const container = document.getElementById("container");
const swiper = document.querySelector(".swiper");
const modal = document.getElementById("modalBlog");

const URL_API = "https://mocki.io/v1/d2ee1732-4fd1-429a-a971-3742f1422b8a";


if (swiper) {
  new Swiper(swiper, {
    direction: "horizontal",
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });
}

const videoGames = async () => {
  const games = await fetch(URL_API).then((response) => response.json());
  let gamesCom = [];
  if (template) {
    const close = modal.querySelector(".close");
    close.addEventListener("click", ()=>{
      modal.remove();
    })
    modal.remove();
    games.forEach(({ title, author, lorem }, index) => {
      const article = template.content.firstElementChild.cloneNode(true);
      let url = title
        .normalize("NFC")
        .replace(/\:/g, "")
        .replace(/\s/g, "-")
        .toLowerCase();
      const img = article.querySelector(".posterG");
      const src = `/finalCoder/IMG/${url}.jpg`;
      img.src = src;

      const titleG = article.querySelector(".titleG");
      titleG.innerText = title;

      const authorG = article.querySelector(".authorG");
      authorG.innerText = author;

      const descriptionsG = article.querySelector(".descriptionsG");
      descriptionsG.innerText = lorem;

      const btn = article.querySelector(".btn");
      btn.addEventListener("click", () => {
        modal.classList.remove("opacity-0");
        const titleG = modal.querySelector(".titleG");
        titleG.innerText = title;

        const img = modal.querySelector(".posterG");
        img.src = src;

        const descriptionsG = modal.querySelector(".descriptionsG");
        descriptionsG.innerText = lorem;

        document.body.append(modal);
        console.log(index);
      });

      container.append(article);
    });
  }
};

videoGames();

if (log) {
  log.addEventListener("click", () => {
    localStorage.removeItem("data");
    window.location.href = "index.html";
    onSigning();
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (name.value == "miguel" && password.value == "1234") {
      localStorage.data = JSON.stringify({ name: name.value });
      window.location.href = "crm.html";
      onSigning();
    } else {
      alert(`Nombre o password no son validos`);
    }
  });
}
