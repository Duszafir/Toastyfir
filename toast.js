const checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>'
const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
const errorIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-x-icon lucide-circle-x"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>'
const infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-info-icon lucide-info"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>'

const icons = {
    close: closeIcon,
    success: checkIcon,
    error: errorIcon,
    info: infoIcon
}

function toastyfir({ title = "", text = "", type = "info", duration = 3000 }) {
    const container = getContainer();

    const divContainer = document.createElement("div");
    divContainer.classList.add("toast", type);

    container.appendChild(divContainer);

    createContent(divContainer, title, text, icons[type]);

    const x = document.createElement("div");
    x.classList.add("x");
    x.innerHTML = closeIcon;
    x.onclick = () => divContainer.classList.add("hide");

    divContainer.appendChild(x);

    setTimeout(() => divContainer.classList.add("show"), 10);

    setTimeout(() => {
        divContainer.classList.add("hide");
        setTimeout(() => {
            divContainer.remove();
        }, 300);
    }, duration);
}

function getContainer() {
    let container = document.querySelector(".notifications");

    if (!container) {
        container = document.createElement("div");
        container.classList.add("notifications");
        document.body.appendChild(container);
    }

    return container;
}

function createContent(divContainer, title, text, icon) {
    const svgIcon = document.createElement("div");
    svgIcon.classList.add("icon");
    svgIcon.innerHTML = icon;

    const content = document.createElement("div");
    content.classList.add("content");

    const titleEl = document.createElement("div");
    titleEl.classList.add("title");
    titleEl.textContent = title;

    const span = document.createElement("span");
    span.classList.add("span");
    span.textContent = text;

    content.appendChild(titleEl);
    content.appendChild(span);

    divContainer.appendChild(svgIcon);
    divContainer.appendChild(content);
}
