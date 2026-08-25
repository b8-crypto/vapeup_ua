import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Получаем элементы UI
const authBlock = document.getElementById("auth-block");
const adminBlock = document.getElementById("admin-block");
const productsList = document.getElementById("products-list");

// Авторизация (Вход)
document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;
    
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        alert("Ошибка входа: " + error.message);
    }
});

// Выход из системы
document.getElementById("logout-btn").addEventListener("click", () => {
    signOut(auth);
});

// Следим за тем, вошел пользователь или вышел
onAuthStateChanged(auth, (user) => {
    if (user) {
        authBlock.classList.add("hidden");
        adminBlock.classList.remove("hidden");
        loadProducts(); // Если вошел — показываем товары
    } else {
        authBlock.classList.remove("hidden");
        adminBlock.classList.add("hidden");
    }
});

// Добавление товара в Firebase Firestore
document.getElementById("save-btn").addEventListener("click", async () => {
    const name = document.getElementById("prod-name").value;
    const price = document.getElementById("prod-price").value;
    const desc = document.getElementById("prod-desc").value;

    if (!name || !price) return alert("Заполните название и цену!");

    try {
        await addDoc(collection(db, "products"), {
            name: name,
            price: Number(price),
            description: desc,
            createdAt: new Date()
        });
        
        // Очищаем форму
        document.getElementById("prod-name").value = "";
        document.getElementById("prod-price").value = "";
        document.getElementById("prod-desc").value = "";
        
        alert("Товар успешно добавлен!");
        loadProducts(); // Обновляем список на экране
    } catch (error) {
        alert("Ошибка при сохранении: " + error.message);
    }
});

// Получение и вывод товаров на экран
async function loadProducts() {
    productsList.innerHTML = "Синхронизация с базой данных...";
    
    try {
        // Берем коллекцию "products" со сротировкой по дате добавления
        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        
        productsList.innerHTML = "";
        
        if (querySnapshot.empty) {
            productsList.innerHTML = "<p>Товаров пока нет.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const item = doc.data();
            productsList.innerHTML += `
                <div class="product-card">
                    <h4>📦 ${item.name}</h4>
                    <p><b>Цена:</b> ${item.price} руб.</p>
                    <p><b>Описание:</b> ${item.description || 'Нет описания'}</p>
                </div>
            `;
        });
    } catch (error) {
        productsList.innerHTML = "Ошибка загрузки: " + error.message;
    }
}
