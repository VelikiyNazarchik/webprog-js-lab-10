let intervalId;
let counter = 0;

document.getElementById("startInterval").addEventListener("click", () => {
    intervalId = setInterval(() => {
        counter++;
        document.getElementById("counter").textContent = counter;
    }, 1000);
});

document.getElementById("stopInterval").addEventListener("click", () => {
    clearInterval(intervalId);
});
