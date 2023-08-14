  function cloneItem() {
    var item = document.getElementById("item");
    var list = document.getElementById("list");
    var clonedItem = item.cloneNode(true);
    list.appendChild(clonedItem);
}

for(var i = 0; i < 5; i++) {
  cloneItem();
}