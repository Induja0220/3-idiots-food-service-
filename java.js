import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://shop-cart-f9f92-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoplist");

const inputFieldEl = document.getElementById("in-put");
const quantityFieldEl = document.getElementById("qy-put");
const addButtonEl = document.getElementById("add-put");
const shoppingListEl = document.getElementById("shop-list");

// Function to render the shopping list items on the UI
function renderShoppingList(data) {
    shoppingListEl.innerHTML = ""; // Clear the existing list

    // Check if data is not undefined and is an object
    if (data && typeof data === "object") {
        for (const key in data) {
            const item = data[key];

        }
    } else {
        shoppingListEl.innerHTML = "<li>No items in the shopping list</li>";
    }
}

// Listen for changes in the database and update the UI accordingly
onValue(shoppingListInDB, (snapshot) => {
    const data = snapshot.val();
    renderShoppingList(data);
});

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    let quantityValue = quantityFieldEl.value;

    if (inputValue.trim() !== "" && quantityValue.trim() !== "") {
        push(shoppingListInDB, { item: inputValue, quantity: quantityValue });
        inputFieldEl.value = "";
        quantityFieldEl.value = "";
    } else {
        alert("Please enter both item and quantity.");
    }
});
