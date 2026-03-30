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

/**
 * Crea un toast
 * @example
 * toastyfir({
        title: 'Notificación',
        text: 'Esta es la descripción',
        type: 'info',
        duration: 3000,
        bgColor: "#8495f5",
        txtColor: "#d9d9d9"
    })
    @param {Object} options - Opciones para configurar el toast
    @param {string} options.title - Título del toast
    @param {string} options.text - Descripción del toast
    @param {"success" | "error" | "info"} [options.type="info"] - Tipo de toast
    @param {number} [options.duration=3000] - Duración en milisegundos
    @param {string} [options.bgColor="#22242f"] - Color de fondo
    @param {string} [options.txtColor="#d9d9d9"] - Color del texto
    @returns {void}
 */

function toastyfir({ title = "", text = "", type = "info", duration = 3000, bgColor = "#22242f" , txtColor = "#d9d9d9"}) {
    const container = getContainer();

    const divContainer = document.createElement("div");
    divContainer.classList.add("toastyfir-toast", type);
    divContainer.style.setProperty('--toastyfir-temp', duration + 'ms')
    divContainer.style.setProperty('--toastyfir-bg-toast', bgColor)
    divContainer.style.setProperty('--toastyfir-text-color', txtColor)

    container.appendChild(divContainer);

    createContent(divContainer, title, text, icons[type]);

    const x = document.createElement("div");
    x.classList.add("toastyfir-x");
    x.innerHTML = closeIcon;
    x.onclick = () => divContainer.classList.add("hide");

    divContainer.appendChild(x);

    setTimeout(() => {
        divContainer.classList.add("hide");
        setTimeout(() => {
            divContainer.remove();
        }, 300);
    }, duration);
}

function getContainer() {
    let container = document.querySelector(".toastyfir-notifications");

    if (!container) {
        container = document.createElement("div");
        container.classList.add("toastyfir-notifications");
        document.body.appendChild(container);
    }

    return container;
}

function createContent(divContainer, title, text, icon) {
    const svgIcon = document.createElement("div");
    svgIcon.classList.add("toastyfir-icon");
    svgIcon.innerHTML = icon;

    const content = document.createElement("div");
    content.classList.add("toastyfir-content");

    const titleEl = document.createElement("div");
    titleEl.classList.add("toastyfir-title");
    titleEl.textContent = title;

    const span = document.createElement("span");
    span.classList.add("toastyfir-span");
    span.textContent = text;

    content.appendChild(titleEl);
    content.appendChild(span);

    divContainer.appendChild(svgIcon);
    divContainer.appendChild(content);
}
