// const BASE_URL = "http://localhost:3000/products";
const BASE_URL = "https://my-json-server.typicode.com/frassing/teste/products";

async function getProducts() {
	try {
		const response = await fetch(BASE_URL);
		if (!response.ok) {
			throw new Error("Não foi possível carregar produtos.");
		}
		const data = await response.json();
		return data;

	} catch (error) {
		throw error;
	}
}

async function addProduct(name, price, image) {
	try {
		const response = await fetch(BASE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: name,
				price: price,
				image: image
			})
		});

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error("Não foi possível adicionar o produto.");
		}
	} catch (error) {
		throw error;
	}
}

async function deleteProduct(id) {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: "DELETE"
		});
	
		if (!response.ok) {
			throw new Error('Não foi possível excluir o produto.');
		}
	} catch (error) {
		throw error;
	}
}

async function searchProduct(searchTerm) {
	try {  
		const response = await fetch(BASE_URL);
		if(response.ok) {
			const products = await response.json();
			// Filtra a lista de produtos para retornar apenas produtos que incluem o conteúdo do termo buscado 
			const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
			return filteredProducts;
		} else {
			throw new Error('Ocorreu um erro ao buscar produtos.'); 
		}
	} catch (error) { 
		throw error; 
	}
}

export const conectApi = {
	getProducts,
	addProduct,
	deleteProduct,
	searchProduct
}
