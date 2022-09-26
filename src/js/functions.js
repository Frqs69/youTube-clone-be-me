//? funkcja obsługująca pojawianie się menu przycisków
export const addListenerActiveClass = (
	itemForListen,
	itemForAddClassActive
) => {
	itemForListen.addEventListener("click", () => {
		itemForAddClassActive.classList.toggle("active");
	});
};

//? funckja obsługująca wywołanie opisu elementu po najechaniu
export const addHoverListener = (item, displayedInfo) => {
	item.addEventListener("mouseenter", () => {
		displayedInfo.style.display = "block";
	});
	item.addEventListener("mouseleave", () => {
		displayedInfo.style.display = "none";
	});
};

//? funckja ukrywająca elementy z listy rozwijanej, aby pozostała podana ilośc widocznych elementów
export const hideUlElements = (list, visibleElements) => {
	const listLi = [...list.children];
	listLi.forEach((item, i) => {
		if (i > visibleElements && i < listLi.length - 1) {
			item.style.display = "none";
		}
	});
	console.log("hided");
};

//? funckja pokazująca wszystkie elementy podanej listy
export const showUlElements = (list) => {
	const listLi = [...list.children];
	listLi.forEach((item) => {
		item.style.display = "block";
	});
};

// wylosowanie liczby wyświetleń, tej danej nie było w dostępnej w API
export const random = () => {
	return Math.floor(Math.random() * (999 - 10)) + 10;
};
