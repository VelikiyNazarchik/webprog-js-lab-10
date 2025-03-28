document.getElementById("fetchData").addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});
