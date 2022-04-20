customElements.define(
  "text-component",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
    }
    connectedCallback() {
      this.render();
    }
    render() {
      const style = document.createElement("style");
      const text = this.textContent;
      const type = this.getAttribute("type") || "body";
      this.innerHTML = `
      <span class="${type}">${text}</span>
      `;
      style.innerHTML = `
      span{
        font-family: 'Poppins', sans-serif;
      }
      .title{
        font-size: 40px;
        font-weight: 700;
      }
      .subtitle{
        font-size: 24px;
        font-weight: 400;
      }
      .subtitle-bold{
        font-size: 24px;
        font-weight: 700;
      }
      .body{
        font-size: 16px;
        font-weight: 400;
      }
      .body-bold{
        font-size: 16px;
        font-weight: 700;
      }
      .caption{
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
      }
        `;
      this.appendChild(style);
    }
  }
);
