import { state } from "../../state";

customElements.define(
  "home-page",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
    }
    myLat: number;
    myLng: number;
    pets;
    addListeners() {
      const geolocationButton = this.querySelector(".button-geolocation");
      geolocationButton.addEventListener("click", () => {
        function error(err) {
          console.warn("ERROR(" + err.code + "): " + err.message);
        }
        navigator.geolocation.getCurrentPosition(async (data) => {
          this.myLat = data.coords.latitude;
          this.myLng = data.coords.longitude;
          const container: any = this.querySelector(".section-container");
          container.innerHTML = ``;
          const pets = await state.getNearbyPets(this.myLat, this.myLng);
          if (pets.length > 0) {
            this.pets = pets;
            this.pets.forEach((pet) => {
              const div = document.createElement("div");
              if (pet.state !== "encontrado") {
                div.innerHTML = `<card-component with-pencil="false" pet-id="${pet.objectID}" name-pet="${pet.name}" img=${pet.img} state="${pet.state}" owner="${pet.userEmail}" lat="${pet._geoloc.lat}" lng="${pet._geoloc.lng}"> </card-component>`;
                container.appendChild(div);
              }
            });
          } else {
            container.innerHTML = `No hay mascotas reportadas cerca de tu zona`;
            container.style.fontFamily = "'Poppins', sans-serif";
            container.style.fontSize = "16px";
            container.style.fontWeight = "400";
          }
        }, error);
      });
    }

    connectedCallback() {
      this.render();
    }
    render() {
      const style = document.createElement("style");
      this.innerHTML = `
      <header-component></header-component>
      <main class="main-container">
      <text-component type="title">Mascotas perdidas cerca tuyo</text-component>
      <section class="section-container">
        <text-component>
          Para ver las mascotas reportadas cerca tuyo necesitamos permiso para conocer tu ubicación.
        </text-component>
        <button-component class="button-geolocation" color="rosa">Dar mi ubicación</button-component>
      </section>
      </main>
    `;
      style.innerHTML = `
    .main-container{
      padding:15px 20px;
    }
    @media (min-width:800px){
      .main-container{
        max-width: 700px;
        margin: 30px auto;
      }
    }
    .section-container{
      display:flex;
      flex-direction: column;
      gap:25px;
      margin-top: 30px;
    }
  `;
      this.appendChild(style);
      this.addListeners();
    }
  }
);
