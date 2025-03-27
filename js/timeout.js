let timeoutId;

document.getElementById("startTimeout").addEventListener("click", () => {
    timeoutId = setTimeout(() => {
        alert("Час вийшов!");
    }, 5000);
});

document.getElementById("cancelTimeout").addEventListener("click", () => {
    clearTimeout(timeoutId);
    alert("Таймер скасовано");
});
