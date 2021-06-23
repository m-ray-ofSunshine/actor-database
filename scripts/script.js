$("#searchBtn").on("click", storeInput)
var searchInput = ""

function storeInput() {
    searchInput = $("#userInput").val()
}