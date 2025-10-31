class PasswordToggle extends HTMLElement {
    isHidden = true;
    input: null | HTMLInputElement = null;
    button = document.createElement("button");

    static observedAttributes = ["for"];

    constructor() {
        super();
    }

    connectedCallback() {
        this.button.textContent = "Show";
        this.button.addEventListener("click", this);
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.append(this.button);
    }

    handleEvent() {
        if (!this.input) return;
        this.isHidden ? this.input.type = "text" : this.input.type = "password";
        this.isHidden = !this.isHidden;
        this.button.textContent = this.isHidden ? "Show" : "Hide";
    }

    attributeChangedCallback(name: string, _: string, newValue: string) {
        if (name === "for") this.input = document.querySelector(`#${newValue}`);
    }
}

customElements.define("password-toggle", PasswordToggle);
