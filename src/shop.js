import { db } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

async function loadProductsToStore() {
    // Находим сетку товаров вашего магазина по классу .products-grid
    const catalogContainer = document.querySelector(".products-grid");
    
    if (!catalogContainer) return;
    catalogContainer.innerHTML = "<p style='color: var(--text-muted);'>Загрузка каталога VapeUp...</p>";

    try {
        // Получаем товары из облака
        const querySnapshot = await getDocs(collection(db, "products"));
        catalogContainer.innerHTML = ""; // Очищаем старые статичные карточки

        if (querySnapshot.empty) {
            catalogContainer.innerHTML = "<p style='color: var(--text-muted);'>Товаров нет в наличии.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            
            // Если картинки нет, ставим красивую темную заглушку в стиле сайта
            const imgUrl = product.imageUrl || "https://placehold.co"; 

            // Ваша точная верстка карточки товара
            const productHTML = `
                <div class="product-card">
                    <img src="${imgUrl}" alt="${product.name}" class="product-img">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-cat">${product.category || "Жидкости"}</p>
                    <div class="product-price">${product.price} ₴</div>
                    <button class="buy-btn">Купить</button>
                </div>
            `;
            
            catalogContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    } catch (error) {
        console.error("Ошибка загрузки из Firebase:", error);
        catalogContainer.innerHTML = "<p style='color: #ff4a4a;'>Ошибка загрузки каталога.</p>";
    }
}

// Запускаем скрипт, когда страница полностью готова
document.addEventListener("DOMContentLoaded", loadProductsToStore);
