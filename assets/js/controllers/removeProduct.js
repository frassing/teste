import { conectApi } from "../services/conectApi.js";

// conectar clique na lixeira com a função de remover produto
export default function addRemoveButtonListeners(card, name, id) {
	const removeBtn = card.querySelector('.product__card--trash-icon');
	removeBtn.addEventListener('click', e => {
		e.preventDefault();
		removeProduct(name, id);
	})
}

async function removeProduct(name, id) {
	const isDeletionConfirmed = confirm(`Deseja remover: ${name}?`);
	if (isDeletionConfirmed) {
		try {
			await conectApi.deleteProduct(id);
			alert(`Produto: ${name} foi removido com sucesso!`);
		} catch (error) {
			alert(error);
		}
	}
}