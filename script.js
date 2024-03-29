const mainTag = document.querySelector("main");
const bodyTag = document.querySelector("body");
const figcaptions = document.querySelectorAll("figcaption");

const cursor = document.querySelector("div.cursor");
const cursorOuter = document.querySelector("div.cursor-outer");

const mq = window.matchMedia(
	"(prefers-reduced-motion: no-preference) and (min-width: 600px)"
);

const runScripts = () => {
	if (mq.matches) {
		// mainTag.style.position = "fixed";
		// mainTag.style.top = "0";
		// mainTag.style.left = "0";
		mainTag.style.width = "100%";

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.intersectionRatio > 0.25) {
						entry.target.classList.add("in-view");
					}
				});
			},
			{
				threshold: [0, 0.25, 1],
			}
		);
		figcaptions.forEach((caption) => {
			observer.observe(caption);
		});

		let currentScroll = 0;
		let aimScroll = 0;

		const changeScroll = function () {
			bodyTag.style.height = mainTag.offsetHeight + "px";
			currentScroll = currentScroll + (aimScroll - currentScroll) * 0.0005;

			mainTag.style.top = -1 * currentScroll + "px";

			figcaptions.forEach((caption) => {
				const box = caption.getBoundingClientRect();
				const midY = box.y + box.height / 2;
				const midScreen = window.innerHeight / 2;
				const diff = midY - midScreen;

				const images = caption.querySelectorAll("img");
				images.forEach((image, i) => {
					const speed = 0.1 + 0.1 * i;
					image.style.top = diff * speed + "px";
				});
			});

			requestAnimationFrame(changeScroll);
		};

		window.addEventListener("scroll", () => {
			aimScroll += window.scrollY;
		});

		changeScroll();

		let cursorCurrentX = 0,
			cursorCurrentY = 0;
		let cursorOuterCurrentX = 0,
			cursorOuterCurrentY = 0;
		let cursorAimX = 0,
			cursorAimY = 0;

		const changeCursor = () => {
			cursorCurrentX = cursorCurrentX + (cursorAimX - cursorCurrentX) * 0.1;
			cursorCurrentY = cursorCurrentY + (cursorAimY - cursorCurrentY) * 0.1;

			cursor.style.left = cursorCurrentX + "px";
			cursor.style.top = cursorCurrentY + "px";

			cursorOuterCurrentX =
				cursorOuterCurrentX + (cursorAimX - cursorCurrentX) * 0.1;
			cursorOuterCurrentY =
				cursorOuterCurrentY + (cursorAimY - cursorCurrentY) * 0.1;

			cursorOuter.style.left = cursorOuterCurrentX + "px";
			cursorOuter.style.top = cursorOuterCurrentY + "px";

			requestAnimationFrame(changeCursor);
		};

		document.addEventListener("mousemove", (event) => {
			cursorAimX = event.pageX;
			cursorAimY = event.pageY;
		});

		changeCursor();
	}
};

runScripts();
mq.addListener(() => {
	runScripts();
});
