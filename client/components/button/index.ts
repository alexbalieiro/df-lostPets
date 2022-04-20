customElements.define(
  "button-component",
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
      const color = this.getAttribute("color") || "gris";
      this.innerHTML = `
      <button class="${color}">${text}</button>
      `;
      style.innerHTML = `
        button{
          width: 100%;
          height: 50px;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Poppins', sans-serif;
          border: 0px;
          border-radius: 4px;
        }
        button:hover{
          color:white;
        }
        button:active{
          background-color:#C4C4C4;
        }
        .gris{
          background-color: #CDCDCD;
        }
        .rosa{
          background-color: #FF9DF5;
        }
        .verde{
          background-color: #97EA9F;
        }
        `;
      this.appendChild(style);
    }
  }
);
