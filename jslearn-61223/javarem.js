// javarem.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, remove, query, orderByChild, equalTo, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Initialize Firebase app
const appSettings = {
    databaseURL: "https://shop-cart-f9f92-default-rtdb.asia-southeast1.firebasedatabase.app/"
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoplist");

// Function to remove an item from the Firebase database
function removeFromDatabase(itemName) {
    // Query to find the item with the specified name
    const q = query(shoppingListInDB, orderByChild("item"), equalTo(itemName));

    // Retrieve the snapshot of the matched items
    onValue(q, (snapshot) => {
        const data = snapshot.val();

        if (data) {
            // Loop through the matched items and remove them from the database
            for (const key in data) {
                const itemKey = key;
                remove(ref(shoppingListInDB, itemKey));
            }
        } else {
            console.log("No matching items found to remove.");
        }
    });
}

// Event listener for the "REMOVE FROM CART" button
document.getElementById("remove-put").addEventListener("click", function () {
    const itemNameToRemove = document.getElementById("remove-input").value.trim();

    if (itemNameToRemove !== "") {
        removeFromDatabase(itemNameToRemove);
    } else {
        alert("Please enter the item name to remove.");
    }
});
