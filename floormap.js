'use strict';
const newMapButton = document.getElementById("newMapButton");
const addItemButton = document.getElementById("addItemButton");
const itemNameInput = document.getElementById("itemName");
const itemNumberInput = document.getElementById("itemNumber");
const itemLocationInput = document.getElementById("itemLocation");
const itemList = document.getElementById("itemList");
function newopen() {
    window.open("./floormapmaking.html");
}
newMapButton.addEventListener("click", newopen);
addItemButton.addEventListener("click", function() {
    const itemName = itemNameInput.value.trim();
    const itemNumber = itemNumberInput.value.trim();
    const itemLocation = itemLocationInput.value.trim();
  
    if (itemName && itemNumber && itemLocation) {
        const listItem = document.createElement("li");
        listItem.innerText = `名称: ${itemName}, 管理番号: ${itemNumber}, 場所: ${itemLocation}`;
        itemList.appendChild(listItem);
        itemNameInput.value = '';
        itemNumberInput.value = '';
        itemLocationInput.value = '';
    } else {
        alert("すべての項目を入力してください。");
    }
});
