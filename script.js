const mainTag = document.querySelector("main");
const bodyTag = document.querySelector("body");

mainTag.style.position = "fixed";
mainTag.style.top = "0";
mainTag.style.left = "0";
mainTag.style.width = "100%";

let currentScroll = 0;

const changeScroll = function () {
	bodyTag.style.height = mainTag.offsetHeight + "px";
	mainTag.style.top = -1 * currentScroll + "px";

	requestAnimationFrame(changeScroll);
};

window.addEventListener("scroll", () => {
  currentScroll += window.scrollY;
})

changeScroll();
