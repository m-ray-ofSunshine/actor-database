$("#searchBtn").on("click", storeInput)

function storeInput() {
    searchInput = $("#userInput").val()
    localStorage.setItem("search", searchInput)
    document.location = "./result.html"
}