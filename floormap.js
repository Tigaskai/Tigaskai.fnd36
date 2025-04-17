'use strict';
const newMapButton = document.getElementById("newMapButton");
const addItemButton = document.getElementById("addItemButton");
const itemName = document.getElementById("itemName");
const itemNumber = document.getElementById("itemNumber");
const itemLocation = document.getElementById("itemLocation");
const itemList = document.getElementById("itemList");
function newopen() {
    window.open("./floormapmaking.html");
}
newMapButton.addEventListener("click", newopen);
addItemButton.addEventListener("click", function() {
    const itemName = itemName.value.trim();
    const itemNumber = itemNumber.value.trim();
    const itemLocation = itemLocation.value.trim();
    if (itemName && itemNumber && itemLocation) {
        const listItem = document.createElement("li");
        listItem.innerText = `名称: ${itemName}, 管理番号: ${itemNumber}, 場所: ${itemLocation}`;
        itemList.appendChild(listItem);
        itemName.value = '';
        itemNumber.value = '';
        itemLocation.value = '';
    } else {
        alert("すべての項目を入力してください。");
    }
});
