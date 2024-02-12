// JavaScript
document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("scratch");
    const context = canvas.getContext("2d");
    let isDragged = false;
    let mouseX = 0;
    let mouseY = 0;
    let rectLeft = canvas.getBoundingClientRect().left;
    let rectTop = canvas.getBoundingClientRect().top;
    const events = {
        mouse: {
            down: "mousedown",
            move: "mousemove",
            up: "mouseup"
        },
        touch: {
            down: "touchstart",
            move: "touchmove",
            up: "touchend"
        }
    };
    let deviceType = "";
    // Detect touch device
    const isTouchDevice = () => {
        try {
            document.createEvent("TouchEvent");
            deviceType = "touch";
            return true;
        } catch (e) {
            deviceType = "mouse";
            return false;
        }
    };
    const getXY = (e) => {
        mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
        mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
    };
    isTouchDevice();
    canvas.addEventListener(events[deviceType].down, (event) => {
        isDragged = true;
        getXY(event);
        scratch(mouseX, mouseY);
    });
    canvas.addEventListener(events[deviceType].move, (event) => {
        if (!isTouchDevice()) {
            event.preventDefault();
        }
        if (isDragged) {
            getXY(event);
            scratch(mouseX, mouseY);
        }
    });
    canvas.addEventListener(events[deviceType].up, () => {
        isDragged = false;
    });
    canvas.addEventListener("mouseleave", () => {
        isDragged = false;
    });
    const scratch = (x, y) => {
        context.globalCompositeOperation = "destination-out";
        context.beginPath();
        context.arc(x, y, 12, 0, 2 * Math.PI);
        context.fill();
    };
    window.onload = () => {
        let gradientColor = context.createLinearGradient(0, 0, 200, 200);
        gradientColor.addColorStop(0, "#fdbe33");
        gradientColor.addColorStop(1, "#07464c");
        context.fillStyle = gradientColor;
        context.fillRect(0, 0, 200, 200);
         // Set base display to block
         document.querySelector('.base').style.display = 'block';

    };
});