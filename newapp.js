const themeLink = document.getElementById("theme");
const moreBtn = document.querySelector(".more-btn");
const changeThemeBtn = document.getElementById("change-theme");
const svgIcons = document.querySelectorAll(".svg-icon");
const historyBtn = document.getElementById("history");
const deleteHistory = document.getElementById("delete-history");
const contactBtn = document.getElementById("contact");

const display = document.querySelector(".display");
const numbersBtn = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const dotte = document.querySelector(".dotte");
const clear = document.querySelector(".clear");
const backSpase = document.querySelector(".backspace");
const equal = document.querySelector(".equal");

const soundBtn = document.querySelector(".sound");
const tapSound = document.getElementById("tap");

let history = JSON.parse(localStorage.getItem("history")) || [];

if (!localStorage.getItem("sound")) {
    localStorage.setItem("sound", "on");
}

function renderTheme() {
    if (localStorage.getItem("theme")) {
        if (localStorage.getItem("theme") == "light") {
            themeLink.href = "css/litheme.css";
            changeThemeBtn.innerHTML =
                'Dark theme<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000"><path d="M479.96-144Q340-144 242-242t-98-238q0-140 97.93-238t237.83-98q13.06 0 25.65 1 12.59 1 25.59 3-39 29-62 72t-23 92q0 85 58.5 143.5T648-446q49 0 92-23t72-62q2 13 3 25.59t1 25.65q0 139.9-98.04 237.83t-238 97.93Zm.04-72q82 0 148.78-47.07Q695.55-310.15 727-386q-20 5-39.67 8.5Q667.67-374 648-374q-113.86 0-193.93-80.07Q374-534.14 374-648q0-19.67 3.5-39.33Q381-707 386-727q-75.85 31.45-122.93 98.22Q216-562 216-480q0 110 77 187t187 77Zm-14-250Z"/></svg>';
            svgColor("#000");
        } else {
            themeLink.href = "css/datheme.css";
            changeThemeBtn.innerHTML =
                'Light theme<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm-.23 72Q400-288 344-344.23q-56-56.22-56-136Q288-560 344.23-616q56.22-56 136-56Q560-672 616-615.77q56 56.22 56 136Q672-400 615.77-344q-56.22 56-136 56ZM216-444H48v-72h168v72Zm696 0H744v-72h168v72ZM444-744v-168h72v168h-72Zm0 696v-168h72v168h-72ZM269-642 166-742l51-55 102 104-50 51Zm474 475L642-268l49-51 103 101-51 51ZM640-691l102-101 51 49-100 103-53-51ZM163-217l105-99 49 47-98 104-56-52Zm317-263Z"/></svg>';
            svgColor("#fff");
        }
    } else {
        localStorage.setItem("theme", "light");
        renderTheme();
    }
}
renderTheme();

function renderSoundIcon() {
    if (localStorage.getItem("sound") == "on") {
        soundBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320ZM400-606l-86 86H200v80h114l86 86v-252ZM300-480Z"/></svg>';
    } else {
        soundBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Zm-80 238v-94l-72-72H200v80h114l86 86Zm-36-130Z"/></svg>';
    }
}
renderSoundIcon();

function playTap() {
    if (localStorage.getItem("sound") == "on") {
        tapSound.currentTime = 0;
        tapSound.play();
    }
}

function renderHistory() {
    document.querySelector(".history-items").innerHTML = "";
    for (var i = history.length - 1; i >= 0; i--) {
        document.querySelector(".history-items").innerHTML += `
        <div class="item">
            <p class="item-exp">${history[i].exp}</p>
            <p class="item-res">${history[i].res}</p>
        </div>`;
    }
    if (history.length == 0) {
        document.querySelector(".history-items").innerHTML =
            '<p class="empty-history">empty</p>';
    }
}
renderHistory();

function svgColor(color) {
    svgIcons.forEach((svg) => {
        svg.style.fill = color;
    });
}

function checkError() {
    if (display.textContent == "error") {
        display.textContent = "";
    }
}

changeThemeBtn.addEventListener("click", () => {
    if (localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme", "dark");
        renderTheme();
    } else {
        localStorage.setItem("theme", "light");
        renderTheme();
    }
});

historyBtn.addEventListener("click", () => {
    document
        .querySelector(".history-container")
        .classList.toggle("show-history");
});

document.querySelector(".history-container").addEventListener("click", (e) => {
    if (e.target == document.querySelector(".history-container")) {
        document
            .querySelector(".history-container")
            .classList.toggle("show-history");
    }
});

moreBtn.addEventListener("click", () => {
    document.querySelector(".menu-container").classList.toggle("hide-menu");
});

document.querySelector(".calc-container").addEventListener("click", () => {
    document.querySelector(".menu-container").classList =
        "menu-container hide-menu";
});

document.querySelector("header h2").addEventListener("click", () => {
    playTap();
});

soundBtn.addEventListener("click", () => {
    if (localStorage.getItem("sound") == "on") {
        localStorage.setItem("sound", "off");
    } else {
        localStorage.setItem("sound", "on");
    }
    renderSoundIcon();
});

numbersBtn.forEach((numBtn) => {
    numBtn.addEventListener("click", () => {
        checkError();
        playTap();
        display.textContent += numBtn.textContent;
        display.scrollLeft = display.scrollWidth;
    });
});

dotte.addEventListener("click", () => {
    checkError();
    let lastNumber = display.textContent.split(/[\+\-\×\÷]/).pop();
    if (lastNumber == "") {
        playTap();
        display.textContent += "0" + dotte.textContent;
        display.scrollLeft = display.scrollWidth;
    } else if (!lastNumber.includes(".")) {
        playTap();
        display.textContent += dotte.textContent;
        display.scrollLeft = display.scrollWidth;
    }
});

operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {
        checkError();
        if (display.textContent == "") {
            if (
                e.target == document.getElementById("division") ||
                e.target == document.getElementById("multiplication")
            ) {
                return;
            }
        }
        checkOperator();
        playTap();
        display.textContent += operator.textContent;
        display.scrollLeft = display.scrollWidth;
    });
});

function checkOperator() {
    let lastChar = display.textContent.slice(-1);
    if (
        lastChar == "+" ||
        lastChar == "-" ||
        lastChar == "×" ||
        lastChar == "÷"
    ) {
        display.textContent = display.textContent.slice(0, -1);
    }
}

backSpase.addEventListener("click", () => {
    checkError();
    playTap();
    display.textContent = display.textContent.slice(0, -1);
});

clear.addEventListener("click", () => {
    playTap();
    display.textContent = "";
});

equal.addEventListener("click", () => {
    checkError();
    const opePattern = /[+\-×÷]/;
    if (display.textContent != "" && opePattern.test(display.textContent)) {
        display.textContent = calculate();
        display.scrollLeft = display.scrollWidth;
        playTap();
    }
});

function calculate() {
    try {
        let lastChar = display.textContent.slice(-1);
        if (
            lastChar == "+" ||
            lastChar == "-" ||
            lastChar == "×" ||
            lastChar == "÷"
        ) {
            display.textContent = display.textContent.slice(0, -1);
        }
        let exp = display.textContent;
        let expression = display.textContent
            .replace(/×/g, "*")
            .replace(/÷/g, "/");
        let noResult = eval(expression);
        let result = parseFloat(noResult.toFixed(5));
        let historyItem = {
            exp: exp,
            res: `= ${result}`,
        };
        history.push(historyItem);
        localStorage.setItem("history", JSON.stringify(history));
        history = JSON.parse(localStorage.getItem("history")) || [];
        renderHistory();
        return result;
    } catch (error) {
        return "error";
    }
}

deleteHistory.addEventListener("click", () => {
    localStorage.setItem("history", "[]");
    history = JSON.parse(localStorage.getItem("history")) || [];
    renderHistory();
});

document.addEventListener("keydown", (e) => {
    let key = e.key;

    if (/^[0-9]$/.test(key)) {
        document.getElementById(`digit${key}`).style.transform = "scale(0.9)";
        document.getElementById(`digit${key}`).style.boxShadow = "none";
        checkError();
        playTap();
        display.textContent += key;
        display.scrollLeft = display.scrollWidth;
    } else if (key == ".") {
        dotte.style.transform = "scale(0.9)";
        dotte.style.boxShadow = "none";
        checkError();
        let lastNumber = display.textContent.split(/[\+\-\×\÷]/).pop();
        if (lastNumber == "") {
            playTap();
            display.textContent += "0" + dotte.textContent;
            display.scrollLeft = display.scrollWidth;
        } else if (!lastNumber.includes(".")) {
            playTap();
            display.textContent += dotte.textContent;
            display.scrollLeft = display.scrollWidth;
        }
    } else if (key == "+") {
        document.getElementById("plus").style.transform = "scale(0.9)";
        document.getElementById("plus").style.boxShadow = "none";
        checkError();
        checkOperator();
        playTap();
        display.textContent += "+";
        display.scrollLeft = display.scrollWidth;
    } else if (key == "-") {
        document.getElementById("minus").style.transform = "scale(0.9)";
        document.getElementById("minus").style.boxShadow = "none";
        checkError();
        checkOperator();
        playTap();
        display.textContent += "-";
        display.scrollLeft = display.scrollWidth;
    } else if (key == "*") {
        document.getElementById("multiplication").style.transform =
            "scale(0.9)";
        document.getElementById("multiplication").style.boxShadow = "none";
        checkError();
        if (display.textContent == "") {
            return;
        }
        checkOperator();
        playTap();
        display.textContent += "×";
        display.scrollLeft = display.scrollWidth;
    } else if (key == "/") {
        document.getElementById("division").style.transform = "scale(0.9)";
        document.getElementById("division").style.boxShadow = "none";
        checkError();
        if (display.textContent == "") {
            return;
        }
        checkOperator();
        playTap();
        display.textContent += "÷";
        display.scrollLeft = display.scrollWidth;
    } else if (key == "C") {
        clear.style.transform = "scale(0.9)";
        clear.style.boxShadow = "none";
        playTap();
        display.textContent = "";
        display.scrollLeft = display.scrollWidth;
    } else if (e.code == "Backspace") {
        backSpase.style.transform = "scale(0.9)";
        backSpase.style.boxShadow = "none";
        checkError();
        playTap();
        display.textContent = display.textContent.slice(0, -1);
        display.scrollLeft = display.scrollWidth;
    } else if (key == "=" || e.code == "Enter" || e.code == "NumpadEnter") {
        equal.style.transform = "scale(0.9)";
        equal.style.boxShadow = "none";
        checkError();
        const opePattern = /[+\-×÷]/;
        if (display.textContent != "" && opePattern.test(display.textContent)) {
            playTap();
            display.textContent = calculate();
            display.scrollLeft = display.scrollWidth;
        }
    }
});

document.addEventListener("keyup", (e) => {
    let key = e.key;

    if (/^[0-9]$/.test(key)) {
        document.getElementById(`digit${key}`).style.transform = "";
        document.getElementById(`digit${key}`).style.boxShadow = "";
    } else if (key == ".") {
        dotte.style.transform = "";
        dotte.style.boxShadow = "";
    } else if (key == "+") {
        document.getElementById("plus").style.transform = "";
        document.getElementById("plus").style.boxShadow = "";
    } else if (key == "-") {
        document.getElementById("minus").style.transform = "";
        document.getElementById("minus").style.boxShadow = "";
    } else if (key == "*") {
        document.getElementById("multiplication").style.transform = "";
        document.getElementById("multiplication").style.boxShadow = "";
    } else if (key == "/") {
        document.getElementById("division").style.transform = "";
        document.getElementById("division").style.boxShadow = "";
    } else if (key == "C") {
        clear.style.transform = "";
        clear.style.boxShadow = "";
    } else if (e.code == "Backspace") {
        backSpase.style.transform = "";
        backSpase.style.boxShadow = "";
    } else if (key == "=" || e.code == "Enter" || e.code == "NumpadEnter") {
        equal.style.transform = "";
        equal.style.boxShadow = "";
    }
});

contactBtn.addEventListener("click", () => {
    window.open('https://github.com/mmdrzacode', '_blank');
});