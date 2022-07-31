const mainTag = document.querySelector("main");

mainTag.style.position = "fixed";
mainTag.style.top = "0";
mainTag.style.left = "0";
mainTag.style.width = "100%";

let currentScroll = 0;

const changeScroll = function () {
	currentScroll += 1;
	mainTag.style.top = -1 * currentScroll + "px";

	requestAnimationFrame(changeScroll);
};

changeScroll();
