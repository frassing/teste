import { conectApi } from "../services/conectApi.js";
import { createCard } from "./createCard.js";
import { loadProductList } from "./main.js";

const searchInput = document.querySelector('[data-search-input]');
const alertMsg = document.querySelector('.search__alert-msg');
const searchBtn = document.querySelector('[data-search-button]');
const clearSearchBtn = document.querySelector('[data-clear-search-button]');

searchBtn.addEventListener('click', event => searchForProduct(event));
clearSearchBtn.addEventListener('click', event => clearSearch(event));

searchInput.addEventListener('keydown', event => {
	if (event.code == "Enter") {
		searchForProduct(event);
	}
});

searchInput.addEventListener('focus', () => {
	alertMsg.textContent = '';
});

async function searchForProduct(event) {
	event.preventDefault();
	const searchTerm = searchInput.value.trim();
	try {
		// se o campo de busca estiver vazio
		if (!searchTerm) {
			alertMsg.textContent = 'Digite algo no campo de pesquisa';
			return;
		}
		
		const searchResult = await conectApi.searchProduct(searchTerm);
		const productList = document.querySelector('[data-product-list]');
		productList.innerHTML = '';

		// Para cada resultado da busca, criar um card e adiciona à lista de produtos
		searchResult.forEach(prod => {
			const result = createCard(prod.name, prod.price, prod.image, prod.id);
			productList.appendChild(result);
		});

		if (searchResult.length == 0) {
			productList.innerHTML = `<h3 class="main__empty_list--message">Nenhum produto encontrado.</h3>`;
		}
	} catch (error) {
		alert(error);
	}
}

// Recarrega a lista de produtos completa, sem o filtro da pesquisa
async function clearSearch(event) {
	event.preventDefault();
	const productList = document.querySelector('[data-product-list]');
	productList.innerHTML = '';
	loadProductList();
	alertMsg.textContent = '';
	searchInput.value = '';
}

