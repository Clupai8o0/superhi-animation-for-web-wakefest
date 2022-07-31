const mainTag = document.querySelector("main");
const bodyTag = document.querySelector("body");

const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
const large = window.matchMedia("(min-width: 600px)");

if (motion.matches && large.matches) {
	mainTag.style.position = "fixed";
	mainTag.style.top = "0";
	mainTag.style.left = "0";
	mainTag.style.width = "100%";

	let currentScroll = 0;
	let aimScroll = 0;

	const changeScroll = function () {
		bodyTag.style.height = mainTag.offsetHeight + "px";
		currentScroll = currentScroll + (aimScroll - currentScroll) * 0.05;

		mainTag.style.top = -1 * currentScroll + "px";

		requestAnimationFrame(changeScroll);
	};

	window.addEventListener("scroll", () => {
		aimScroll += window.scrollY;
	});

	changeScroll();
}
