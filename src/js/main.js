import "regenerator-runtime/runtime";
import {
	addListenerActiveClass,
	addHoverListener,
	hideUlElements,
	showUlElements,
	random,
} from "./functions";

let apiKey = "";
const movieBoxContainer = document.querySelector(".moviesContainer");
const containerContent = document.querySelector(".container_content");
//obsługa przycisku szukaj
const searchBtn = document.querySelector(".form_searchBtn");
const searchBtnInfo = document.querySelector(".searchBtnInfo");
const searchBtn_mobile = document.querySelector(".form_searchBtn-mobile");
//obsługa przycisku kamery
const cameraBtn = document.querySelector(".fa-video");
const cameraBtnInfo = document.querySelector(".cameraBtnInfo");
const cameraIconMenu = document.querySelector(".cameraIconMenu");
//obsługa przycisku mikrofonu
const microfonBtn = document.querySelector(".microfonIcon");
const microfonBtnInfo = document.querySelector(".microfonBtnInfo");
// obsługa przycisku dzwoneczka
const ringBellBtn = document.querySelector(".fa-bell");
const ringBtnInfo = document.querySelector(".ringBtnInfo");
const ringBellIconMenu = document.querySelector(".ringBellIconMenu");
const ringBellSettingsBtn = document.querySelector(".gear");
const ringBellSettingsBtnInfo = document.querySelector(".ringBellSettingsBtn");
// pobranie przycisków menu
const mainMenuBtn = document.querySelector(".mainMenuBtn");
const nav_extended = document.querySelector(".nav_extended");
const nav_shrinked = document.querySelector(".nav_shrinked");
const nav_mobile = document.querySelector(".nav_extended-mobile");
const mobile_shadow = document.querySelector(".mobile_shadow");

const userIcon = document.querySelector(".userAccIcon");
const userMenu = document.querySelector(".userAccMenu");

//obsługa przycisków mikrofonu kamery, dzowneczka i ikony profilu w wersji mobile
const userAccIcon_mobile = document.querySelector(".userAccIcon_mobile");
const userAccMenu_mobile = document.querySelector(".userAccMenu_mobile");
const ringBellBtn_mobile = document.querySelector(".fa-bell-mobile");
const ringBellIconMenu_mobile = document.querySelector(
	".ringBellIconMenu_mobile"
);
const cameraBtn_mobile = document.querySelector(".fa-video_mobile");
const cameraIconMenu_mobile = document.querySelector(".cameraIconMenu_mobile");

//obsługa informacyjnego okna startowego
const infoOnStart = document.querySelector(".infoOnStart");
const infoOnStartCloseBtn = document.querySelector(
	".infoOnStart_content-close"
);
const infoOnStartBackgound = document.querySelector(".backgound");

infoOnStartCloseBtn.addEventListener("click", () => {
	infoOnStart.style.display = "none";
});

infoOnStartBackgound.addEventListener("click", (e) => {
	if (e.target.classList.contains("backgound"))
		infoOnStart.style.display = "none";
});

//? obsługa wyszukiwarki filmów
const searchText = document.querySelector(".form_text");
const searchText_mobile = document.querySelector(".form_text-mobile");

//! obsługa main menu
//? sprawdzenie wielkości ekranu urządzenia i dostosowanie menu wyświetlonego na początku
(() => {
	searchText.value = "";
	searchText_mobile.value = "";

	if (screen.width > 790) {
		mainMenuBtn.addEventListener("click", () => {
			nav_extended.classList.toggle("nav-active");
			nav_shrinked.classList.toggle("nav-active");
			containerContent.classList.toggle("nav-small");
		});
	}
	if (screen.width <= 1300 && screen.width > 790) {
		nav_extended.classList.remove("nav-active");
		nav_shrinked.classList.add("nav-active");
		containerContent.classList.add("nav-small");
	} else if (screen.width <= 790) {
		nav_extended.classList.remove("nav-active");
		nav_shrinked.classList.remove("nav-active");
		containerContent.classList.add("nav-small");
		mainMenuBtn.addEventListener("click", () => {
			nav_mobile.classList.toggle("nav-active");
			mobile_shadow.classList.toggle("active");
		});
	}

	if (screen.width < 660) {
		searchBtn_mobile.addEventListener("click", (e) => {
			e.preventDefault();
			const title = searchText_mobile.value;
			if (searchText_mobile.value === "") return;
			searchForMovies(title);
		});
	} else {
		searchBtn.addEventListener("click", (e) => {
			e.preventDefault();
			const title = searchText.value;
			if (searchText.value === "") return;
			searchForMovies(title);
		});
	}
})();

//! obsługa list pojawiących się oraz pojawiania się opisu najechanego przycisku
addListenerActiveClass(cameraBtn, cameraIconMenu);
addListenerActiveClass(cameraBtn_mobile, cameraIconMenu_mobile);
addListenerActiveClass(userIcon, userMenu);
addListenerActiveClass(userAccIcon_mobile, userAccMenu_mobile);
addListenerActiveClass(ringBellBtn, ringBellIconMenu);
addListenerActiveClass(ringBellBtn_mobile, ringBellIconMenu_mobile);

addHoverListener(searchBtn, searchBtnInfo);
addHoverListener(cameraBtn, cameraBtnInfo);
addHoverListener(ringBellBtn, ringBtnInfo);
addHoverListener(microfonBtn, microfonBtnInfo);
addHoverListener(ringBellSettingsBtn, ringBellSettingsBtnInfo);

//? obsługująca kliknięcie poza menu, aby je ukryć
document.addEventListener("click", (e) => {
	if (!cameraBtn.contains(e.target)) {
		cameraIconMenu.classList.remove("active");
	}
	if (!ringBellBtn.contains(e.target)) {
		ringBellIconMenu.classList.remove("active");
	}
	if (!userIcon.contains(e.target)) {
		userMenu.classList.remove("active");
	}
});

//!obłusga list rozwijanych w głównym menu
const firstUlList = document.querySelector(".firstUlList");
const firstUlListMobile = document.querySelector(".firstUlList-mobile");
const secondUlList = document.querySelector(".secondUlList");
const secondUlListMobile = document.querySelector(".secondUlList-mobile");
const showLiItemsBtn = document.querySelectorAll(".show_more_liItems");

console.log(firstUlListMobile);

showLiItemsBtn.forEach((item) => {
	item.addEventListener("click", () => {
		const parentElement = item.parentElement;
		if (item.classList.contains("itemsShow")) {
			hideUlElements(parentElement, 4);
			item.classList.remove("itemsShow");
			item.children[0].children[0].style.transform = "rotate(0)";
			item.children[0].children[1].textContent = "Pokaż więcej";
		} else {
			item.classList.add("itemsShow");
			showUlElements(parentElement);
			item.children[0].children[0].style.transform = "rotate(180deg)";
			item.children[0].children[1].textContent = "Pokaż mniej";
		}
	});
});

hideUlElements(firstUlList, 4);
hideUlElements(firstUlListMobile, 4);
hideUlElements(secondUlList, 4);
hideUlElements(secondUlListMobile, 4);

//! obsługa slidera z listą kategorii
const slider = document.querySelector(".items");
const shadowLeft = document.querySelector(".shadow-left");
const shadowRight = document.querySelector(".shadow-right");
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
	isDown = true;
	startX = e.pageX - slider.offsetLeft;

	scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
	isDown = false;
});
slider.addEventListener("mouseup", () => {
	isDown = false;
});
slider.addEventListener("mousemove", (e) => {
	if (!isDown) return;
	e.preventDefault();
	const x = e.pageX - slider.offsetLeft;
	const walk = (x - startX) * 1;
	slider.scrollLeft = scrollLeft - walk;
	console.log("slider.scrollLeft", slider.scrollLeft);

	if (slider.scrollLeft > 20) {
		shadowLeft.style.display = "flex";
	} else {
		shadowLeft.style.display = "none";
	}
	if (slider.scrollLeft > 250) {
		shadowRight.style.display = "none";
	} else {
		shadowRight.style.display = "flex";
	}
});

shadowRight.addEventListener("click", () => {
	slider.scrollLeft += 180;
	if (slider.scrollLeft >= 0) {
		shadowLeft.style.display = "flex";
	} else {
		shadowLeft.style.display = "none";
	}
	if (slider.scrollLeft >= 180) {
		shadowRight.style.display = "none";
	} else {
		shadowRight.style.display = "flex";
	}
});

shadowLeft.addEventListener("click", () => {
	slider.scrollLeft -= 180;
	if (slider.scrollLeft > 87 || slider.scrollLeft === 180) {
		shadowLeft.style.display = "flex";
	} else {
		shadowLeft.style.display = "none";
	}
	if (slider.scrollLeft > 180) {
		shadowRight.style.display = "none";
	} else {
		shadowRight.style.display = "flex";
	}
});

//! obsługa slidera z kategoriami po wybraniu kategorii
const categoryList = [...document.querySelectorAll(".containerLiBtn")];
categoryList.forEach((item) => {
	item.addEventListener("click", () => {
		categoryList.forEach((item) => {
			item.classList.remove("activeContainerLi");
		});
		item.classList.add("activeContainerLi");
		searchForMovies(item.textContent);
	});
});

//! obsługa API
//obliczenie ile czasu upłynęło od udostępnienia video
const timeFromUploadVideo = (uploadedVideoTime) => {
	const videoTime = uploadedVideoTime;
	const videoTimeEdited = videoTime.slice(0, 10).split("-");
	const newDate = new Date(
		videoTimeEdited[0],
		videoTimeEdited[1] - 1,
		videoTimeEdited[2]
	);
	const today = new Date();
	const result = Math.abs(today - newDate);
	const days = Math.floor(result / (1000 * 3600 * 24));

	if (days >= 28) {
		if (days > 365) {
			const years = Math.floor(days / 365);
			if (years === 1) {
				return "rok";
			} else if (years > 1 && years < 5) {
				return `${years} lata`;
			} else {
				console.log(years, "lat");
				return `${years} lat`;
			}
		}

		const months = Math.floor(days / 28);
		if (months === 1) {
			return "miesiąc";
		} else if (months > 1 && months < 5) {
			return `${months} miesiące`;
		} else {
			return `${months} miesięcy`;
		}
	} else {
		return `${days} dni`;
	}
};

const createLoad = () => {
	html = `
	<div class="movieBox_load">
                    <div  class="movieBox_load_img"></div>
                    <div class="movieBox_load_dsc">
                        <div class="movieBox_load_dsc_icon"></div>
                        <div class="movieBox_load_dsc_text">
                            <div class="movieBox_load_dsc_text-Title">Tytuł filmu</div>
                            <div class="movieBox_load_dsc_text-Creator">Nazwa kanału</div>
                            <div class="movieBox_load_dsc_text-Scope"><span class="views">200 tys. wyświetleń</span><span
                                    class="uploaded">1 dzień temu</span>
                            </div>
                        </div>
                    </div>
                </div>
	`;

	movieBoxContainer.innerHTML = "";
	for (let i = 0; i < 20; i++) {
		movieBoxContainer.insertAdjacentHTML("beforeend", html);
	}
};

const removeLoading = () => {
	const load = document.querySelectorAll(".movieBox_load");
	load.forEach((item) => {
		item.style.display = "none";
	});
};

// załadowanie filmików wykorzystując API
const searchForMovies = async (moviePhrase) => {
	try {
		if (apiKey === "") throw Error("No API key");
		createLoad();
		const res = await fetch(
			`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&key=${apiKey}&type=video&q=${moviePhrase}`
		);

		const data = await res.json();

		data.items.forEach(async (item) => {
			const dataItem = item.snippet;
			const channelImg = await waitForChannelImg(dataItem.channelId);

			const html = `
		<a href="https://www.youtube.com/watch?v=${
			item.id.videoId
		}" target="_blank" class="movieBox">
					<img src="${dataItem.thumbnails.high.url}" alt="" class="movieBox_img">
					<span class="movieBox_clickInfo">Kliknij, aby otworzyć</span>
					<div class="movieBox_dsc">
						<img src="${channelImg}" alt="" class="movieBox_dsc_icon">
						<div class="movieBox_dsc_text">
							<div class="movieBox_dsc_text-Title">${dataItem.title}</div>
							<div class="movieBox_dsc_text-Creator">${dataItem.channelTitle}</div>
							<div class="movieBox_dsc_text-Scope"><span class="views">${random()} tys. wyświetleń</span><span
									class="uploaded">${timeFromUploadVideo(dataItem.publishedAt)} temu</span>
							</div>
						</div>
					</div>
			</a>`;

			movieBoxContainer.insertAdjacentHTML("beforeend", html);
		});
		removeLoading();
	} catch (e) {
		const API_info = document.querySelector(".API_info");
		API_info.style.display = "flex";
		setTimeout(() => {
			API_info.style.display = "none";
		}, 3600);
	}
};

//funkcja odpowiedzialna za załadowanie zdjęcia profilowego kanału z którego pochodzi filmik
const waitForChannelImg = async (channelId) => {
	const resChannel = await fetch(
		`https://www.googleapis.com/youtube/v3/channels?part=snippet&key=${apiKey}&id=${channelId}`
	);
	const data = await resChannel.json();
	return data.items[0].snippet.thumbnails.default.url;
};

//włączenie API
const APISwitch = document.querySelector(".API");
const APIDescription = document.querySelector(".API_description");
const APISwitchInput = document.querySelector(".API_switch-input");

APISwitchInput.addEventListener("click", () => {
	APIDescription.style.color = "#00ff2f";
	APIDescription.textContent = "API zostało włączone";
	apiKey = "AIzaSyD4caW2Z0_SLQq17bzhgT9HZ13VCSP81To";

	setTimeout(() => {
		APISwitch.style.transform = "translateY(-100px)";
		setTimeout(() => {
			APISwitch.style.display = "none";
		}, 300);
		APISwitchInput.checked = false;
	}, 3600);
	searchBtn.disabled = false;
});

const middlePanel_mobile = document.querySelector(".middlePanel-mobile");
const searchBtnActive = document.querySelector(".searchBtn-mobile");
const backBtn = document.querySelector(".backBtn");
searchBtnActive.addEventListener("click", () => {
	middlePanel_mobile.style.display = "flex";
});
backBtn.addEventListener("click", () => {
	middlePanel_mobile.style.display = "none";
});
