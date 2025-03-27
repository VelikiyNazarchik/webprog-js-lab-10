document.addEventListener("DOMContentLoaded", () => {
    let userSelectedDate;
    let countdownInterval;

    // Ініціалізація Flatpickr
    flatpickr("#datetime-picker", {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            userSelectedDate = selectedDates[0];
            console.log(userSelectedDate); // Перевірте вибрану дату

            if (!userSelectedDate) {
                return;
            }

            if (userSelectedDate < new Date()) {
                iziToast.error({
                    title: "Error",
                    message: "Please choose a future date",
                });
                document.querySelector("[data-start]").disabled = true; // блокуємо кнопку
            } else {
                document.querySelector("[data-start]").disabled = false; // розблоковуємо кнопку
            }
        }
    });

    // Логування для перевірки
    document.querySelector("[data-start]").addEventListener("click", () => {
        console.log("Start button clicked");
        startCountdown();
    });

    function startCountdown() {
        console.log("Countdown started");
        document.querySelector("[data-start]").disabled = true;
        document.getElementById("datetime-picker").disabled = true;

        countdownInterval = setInterval(() => {
            const ms = userSelectedDate - new Date();

            if (ms <= 0) {
                clearInterval(countdownInterval);
                iziToast.success({
                    title: "Done",
                    message: "Countdown finished!",
                });
                document.getElementById("datetime-picker").disabled = false;
                return;
            }

            const { days, hours, minutes, seconds } = convertMs(ms);

            document.querySelector("[data-days]").textContent = addLeadingZero(days);
            document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
            document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
            document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
        }, 1000);
    }

    function convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor(((ms % day) % hour) / minute);
        const seconds = Math.floor((((ms % day) % hour) % minute) / second);
        return { days, hours, minutes, seconds };
    }

    function addLeadingZero(value) {
        return String(value).padStart(2, "0");
    }
});
