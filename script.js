let jsonData = [];
let displayedItems = 20;

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        jsonData = data;
        displayItems();
    })
    .catch(error => console.error('Server Unavailable!:', error));

function displayItems() {
    const resultsDiv = document.getElementById("results");
    const start = displayedItems - 20;
    const end = displayedItems;

    for (let i = start; i < end && i < jsonData.length; i++) {
        const item = jsonData[i];
        const div = document.createElement("div");
        div.className = "file-item";
        div.textContent = item.Name;
        div.onclick = () => showPopup(item.Name, item.Item_ID, item.Icon_Name, item.TextID);
        resultsDiv.appendChild(div);
    }

    displayedItems += 10;
}

document.getElementById("results").addEventListener("scroll", function() {
    const resultsDiv = document.getElementById("results");
    if (resultsDiv.scrollTop + resultsDiv.clientHeight >= resultsDiv.scrollHeight) {
        displayItems();
    }
});

function searchData() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";
    displayedItems = 10;

    jsonData.forEach(item => {
        if (item.Name.toLowerCase().includes(searchValue)) {
            const div = document.createElement("div");
            div.className = "file-item";
            div.textContent = item.Name;
            div.onclick = () => showPopup(item.Name, item.Item_ID, item.Icon_Name, item.TextID);
            resultsDiv.appendChild(div);
        }
    });
}

function showPopup(name, itemID, iconName, textID) {
    document.getElementById("popupTitle").textContent = name;
    document.getElementById("itemID").textContent = itemID;
    document.getElementById("iconName").textContent = iconName;
    document.getElementById("textID").textContent = textID;
    document.getElementById("popup").classList.add("active");
}

function closePopup() {
    document.getElementById("popup").classList.remove("active");
}