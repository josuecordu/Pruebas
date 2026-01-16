/* ===== CONTADOR ===== */
const startDate = new Date("2025-09-08T21:00:00");
const counter = document.getElementById("counter");

function updateCounter() {
    const now = new Date();
    let diff = Math.floor((now - startDate) / 1000);
    const d = Math.floor(diff / 86400); diff %= 86400;
    const h = Math.floor(diff / 3600); diff %= 3600;
    const m = Math.floor(diff / 60);
    const s = diff % 60;
    counter.innerText = `Todo empezó hace: ${d} días ${h} h ${m} min ${s} s`;
}
setInterval(updateCounter, 1000);
updateCounter();

/* ===== CORAZONES CAYENDO ===== */
setInterval(() => {
    const h = document.createElement("div");
    h.className = "falling-heart";
    h.textContent = "❤";
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = 6 + Math.random() * 4 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 10000);
}, 420);

/* ===== INTERACCIONES ===== */
function spawnTouchHearts(x, y) {
    for (let i = 0; i < 8; i++) {
        const h = document.createElement("div");
        h.className = "touch-heart";
        h.textContent = "❤";
        h.style.left = x + "px";
        h.style.top = y + "px";
        h.style.setProperty("--x", (Math.random() * 40 - 20) + "px");
        h.style.setProperty("--y", (Math.random() * 40 - 20) + "px");
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 800);
    }
}

/* ===== GRAN CORAZÓN ===== */
let bigHeart = null;
const loveText = document.getElementById("loveText");

function showBigHeart() {
    if (bigHeart) return;
    bigHeart = document.createElement("div");
    bigHeart.className = "big-heart-container";
    document.body.appendChild(bigHeart);

    for (let i = 0; i < 520; i++) {
        const t = Math.random() * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));

        const p = document.createElement("div");
        p.className = "particle-heart";
        p.textContent = "❤";
        p.style.left = 270 + x * 10 + "px";
        p.style.top = 270 + y * 10 + "px";
        p.style.animationDelay = Math.random() * 2 + "s";
        bigHeart.appendChild(p);
    }
}

function hideBigHeart() {
    if (bigHeart) {
        bigHeart.remove();
        bigHeart = null;
    }
}

/* ===== GATO INTERACTIVO ===== */
const cat = document.getElementById("cat");
let isJumping = false;

function jumpCat() {
    if (isJumping) return;
    isJumping = true;
    cat.style.transition = "transform 0.3s ease-out";
    cat.style.transform = "translateY(-50px)";
    setTimeout(() => {
        cat.style.transform = "translateY(0)";
        setTimeout(() => {
            cat.style.transition = "";
            isJumping = false;
        }, 300);
    }, 300);
}

/* ===== TOUCH ===== */
document.addEventListener("touchstart", e => {
    if (e.touches.length === 1)
        spawnTouchHearts(e.touches[0].clientX, e.touches[0].clientY);

    if (e.touches.length === 2)
        jumpCat();

    if (e.touches.length === 3)
        loveText.classList.add("active");
});

document.addEventListener("touchmove", e => {
    if (e.touches.length === 1)
        spawnTouchHearts(e.touches[0].clientX, e.touches[0].clientY);
});

document.addEventListener("touchend", e => {
    if (e.touches.length < 2)
        hideBigHeart();

    if (e.touches.length < 3)
        loveText.classList.remove("active");
});
