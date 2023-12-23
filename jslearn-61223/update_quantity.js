// update_quantity.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://shop-cart-f9f92-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoplist");

// Make sure these IDs match the actual IDs in your HTML
const updateInputFieldEl = document.getElementById("in-input");
const updateQuantityFieldEl = document.getElementById("qy-input");
const updateButtonEl = document.getElementById("up-put");

updateButtonEl.addEventListener("click", function () {
    const updateInputValue = updateInputFieldEl.value;
    const updateQuantityValue = updateQuantityFieldEl.value;

    if (updateInputValue && updateQuantityValue) {
        // Use the name of the item as the key
        const updateKey = updateInputValue;

        const updates = {
            item: updateInputValue,
            quantity: updateQuantityValue
        };

        update(ref(shoppingListInDB.child(updateKey)), updates);

        updateInputFieldEl.value = "";
        updateQuantityFieldEl.value = "";

        alert('Updated');
    } else {
        alert('Please enter both item and quantity.');
    }
});
