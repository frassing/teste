import addRemoveButtonListeners from "./removeProduct.js";

export function createCard(name, price, image, id) {
	const newCard = document.createElement("div");
	newCard.classList.add("product__card");
	newCard.setAttribute("data-id", id);
	newCard.innerHTML = `
		<section class="product__card--img-container">
			<img class="product__card--img" src="${image}" alt="Produto ${name}">
		</section>
		<section class="product__card--info">
			<h3 class="product__card--name">${name}</h3>
			<div class="product__card--details">
				<p class="product__card--price">R$ ${price}</p>
				<img class="product__card--trash-icon" src="./assets/images/trash-icon.png" alt="Excluir">
			</div>
		</section>
	`;
	addRemoveButtonListeners(newCard, name, id);
	return newCard;
}
