const PRODUCTS = [
  { id:"tokyo-drift",   name:"TOKYO DRIFT",     price:5500,  image:"images/drop-1.png",   tag:"NUEVO DROP",       category:"MOCHILA",  collection:"DROP 014", isNew:true },
  { id:"mecha-shark",  name:"MECHA SHARK",      price:6200,  image:"images/drop-2.png",   tag:"EDICIÓN LIMITADA", category:"COLABO",   collection:"ANIME LEGENDS", isNew:true },
  { id:"holo-core",    name:"HOLO CORE",        price:7200,  image:"images/drop-3.png",   tag:"EXCLUSIVO WEB",    category:"MOCHILA",  collection:"HOLO SERIES", isNew:true },
  { id:"og-shark",     name:"OG SHARK",         price:4900,  image:"images/icon-1.png",   tag:"ICONO",            category:"MOCHILA",  collection:"SHARK FAMILY" },
  { id:"money-stacks", name:"MONEY STACKS",     price:5900,  image:"images/icon-2.png",   tag:"ICONO",            category:"MOCHILA",  collection:"MONEY SERIES" },
  { id:"subway-king",  name:"SUBWAY KING",      price:5500,  image:"images/icon-3.png",   tag:"ICONO",            category:"MOCHILA",  collection:"NYC GRAFFITI" },
  { id:"ronin-sakura", name:"RONIN SAKURA",     price:7800,  image:"images/drop-2.png",   tag:"ANIME COLLAB",     category:"COLABO",   collection:"ANIME LEGENDS", isNew:true },
  { id:"neon-dragon",  name:"NEON DRAGON",      price:6800,  image:"images/drop-1.png",   tag:"AGOTADO",          category:"COLABO",   collection:"ANIME LEGENDS", soldOut:true },
  { id:"midnight",     name:"MIDNIGHT HERO",    price:7500,  image:"images/icon-1.png",   tag:"COMIC COLLAB",     category:"COLABO",   collection:"COMIC LEGENDS" },
  { id:"court-king",   name:"COURT KING",       price:6200,  image:"images/icon-3.png",   tag:"HOOPS COLLAB",     category:"COLABO",   collection:"HOOPS" },
  { id:"fanny-shark",  name:"SHARK BITE FANNY", price:3600,  image:"images/cat-fanny.png",tag:"RIÑONERA",         category:"RIÑONERA", collection:"SHARK FAMILY", isNew:true },
  { id:"laptop-money", name:"MONEY LAPTOP 15",  price:4200,  image:"images/cat-laptop.png",tag:"PORTÁTIL",        category:"MOCHILA",  collection:"MONEY SERIES", isNew:true },
];

function formatPrice(n) {
  return "RD$" + Math.round(n).toLocaleString("es-DO");
}

function renderProductCard(p, dark = false) {
  const tagClass = p.soldOut ? "product-tag sold-out" : "product-tag";
  return `
  <div class="product-card${dark ? " dark-card" : ""}">
    <span class="${tagClass}">${p.tag || p.category}</span>
    <div class="product-img-wrap">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
    </div>
    <div class="product-info">
      <p class="product-collection">${p.collection || p.category}</p>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-price">${formatPrice(p.price)}</p>
      <button class="add-to-cart-btn" ${p.soldOut ? "disabled" : ""} onclick="addToCart('${p.id}')">
        ${p.soldOut ? "AGOTADO" : "AÑADIR AL CARRITO"}
      </button>
    </div>
  </div>`;
}
