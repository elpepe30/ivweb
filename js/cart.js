const FREE_SHIPPING = 6000;
const SHIPPING_COST = 300;
const STORAGE_KEY = "dropyard_cart_v1";

let cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function saveCart() { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }

function cartTotal() { return cart.reduce((s,i) => s + i.price * i.qty, 0); }
function cartCount() { return cart.reduce((s,i) => s + i.qty, 0); }

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p || p.soldOut) return;
  const item = cart.find(x => x.id === id);
  if (item) item.qty++;
  else cart.push({ id:p.id, name:p.name, price:p.price, image:p.image, qty:1 });
  saveCart();
  updateCartUI();
  toast("AÑADIDO AL CARRITO", p.name + " · " + formatPrice(p.price), "success");
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  saveCart(); updateCartUI(); renderCartItems();
}

function setQty(id, delta) {
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(); updateCartUI(); renderCartItems();
}

function updateCartUI() {
  const count = cartCount();
  const badge = document.getElementById("cart-badge");
  if (badge) {
    badge.textContent = count;
    badge.classList.toggle("visible", count > 0);
  }
}

function renderCartItems() {
  const wrap = document.getElementById("cart-items");
  const footer = document.getElementById("cart-footer");
  if (!wrap) return;

  if (cart.length === 0) {
    wrap.innerHTML = `<div class="cart-empty"><svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>Tu carrito está vacío</p></div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";
  const total = cartTotal();
  const shipping = total >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  const grand = total + shipping;

  wrap.innerHTML = cart.map(item => `
  <div class="cart-item">
    <div class="cart-item-img"><img src="${item.image}" alt="${item.name}"></div>
    <div class="cart-item-info">
      <p class="cart-item-name">${item.name}</p>
      <p class="cart-item-price">${formatPrice(item.price)}</p>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="setQty('${item.id}',-1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="setQty('${item.id}',1)">+</button>
        <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Eliminar">✕</button>
      </div>
    </div>
  </div>`).join("");

  document.getElementById("cart-subtotal").textContent = formatPrice(total);
  document.getElementById("cart-shipping").textContent = shipping === 0 ? "GRATIS" : formatPrice(shipping);
  document.getElementById("cart-grand").textContent = formatPrice(grand);
  const hint = document.getElementById("cart-hint");
  if (hint) {
    if (shipping > 0) {
      hint.textContent = "Añade " + formatPrice(FREE_SHIPPING - total) + " más para envío gratis";
      hint.style.display = "block";
    } else {
      hint.style.display = "none";
    }
  }
}

function openCart() {
  document.getElementById("cart-overlay").classList.add("open");
  document.getElementById("cart-drawer").classList.add("open");
  renderCartItems();
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cart-overlay").classList.remove("open");
  document.getElementById("cart-drawer").classList.remove("open");
  document.body.style.overflow = "";
}

function checkout() {
  if (cart.length === 0) return;
  const btn = document.getElementById("checkout-btn");
  if (btn) { btn.textContent = "PROCESANDO..."; btn.disabled = true; }
  setTimeout(() => {
    const orderId = "DY" + Math.random().toString(36).slice(2,8).toUpperCase();
    cart = []; saveCart(); updateCartUI();
    const wrap = document.getElementById("cart-items");
    const footer = document.getElementById("cart-footer");
    if (footer) footer.style.display = "none";
    if (wrap) wrap.innerHTML = `
      <div class="order-confirm">
        <div class="order-confirm-icon">✓</div>
        <h3>¡PEDIDO CONFIRMADO!</h3>
        <p>Pedido #${orderId} · Te escribimos por WhatsApp</p>
      </div>`;
    if (btn) { btn.textContent = "FINALIZAR COMPRA"; btn.disabled = false; }
    toast("¡PEDIDO REALIZADO!", "Pedido #" + orderId + " confirmado.", "success");
    setTimeout(closeCart, 4000);
  }, 1200);
}

/* ── SEARCH ─────────────────────────────────── */
function openSearch() {
  document.getElementById("search-overlay").classList.add("open");
  document.getElementById("search-input").value = "";
  document.getElementById("search-results").innerHTML = "";
  document.getElementById("search-input").focus();
  document.body.style.overflow = "hidden";
}
function closeSearch() {
  document.getElementById("search-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function handleSearch(q) {
  const box = document.getElementById("search-results");
  if (!q.trim()) { box.innerHTML = ""; return; }
  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    (p.collection||"").toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  );
  if (!results.length) {
    box.innerHTML = `<p class="search-no-results">Sin resultados para "${q}"</p>`;
    return;
  }
  box.innerHTML = results.slice(0,8).map(p => `
  <div class="search-result-item" onclick="addToCart('${p.id}');closeSearch();">
    <div class="search-result-img"><img src="${p.image}" alt="${p.name}"></div>
    <div>
      <p class="search-result-name">${p.name}</p>
      <p class="search-result-price">${formatPrice(p.price)}</p>
    </div>
  </div>`).join("");
}

/* ── TOAST ──────────────────────────────────── */
function toast(title, desc, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<p class="toast-title">${title}</p>${desc ? `<p class="toast-desc">${desc}</p>` : ""}`;
  container.appendChild(el);
  setTimeout(() => { el.style.opacity = "0"; el.style.transition = "opacity .3s"; setTimeout(() => el.remove(), 300); }, 3500);
}

/* ── INIT ───────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();

  // navbar scroll effect
  const navbar = document.getElementById("navbar");
  if (navbar) {
    const onScroll = () => navbar.classList.toggle("scrolled", window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
  }

  // cart overlay click to close
  const overlay = document.getElementById("cart-overlay");
  if (overlay) overlay.addEventListener("click", closeCart);

  // search input
  const si = document.getElementById("search-input");
  if (si) si.addEventListener("input", e => handleSearch(e.target.value));

  // search overlay click to close
  const so = document.getElementById("search-overlay");
  if (so) so.addEventListener("click", e => { if (e.target === so) closeSearch(); });

  // keyboard
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeCart(); closeSearch(); closeMobileMenu(); }
    if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openSearch(); }
  });

  // mobile menu
  const mobileBtn = document.getElementById("mobile-menu-btn");
  if (mobileBtn) mobileBtn.addEventListener("click", openMobileMenu);
  const closeMenuBtn = document.getElementById("mobile-menu-close");
  if (closeMenuBtn) closeMenuBtn.addEventListener("click", closeMobileMenu);

  // FAQ accordion
  document.querySelectorAll(".faq-question").forEach(q => {
    q.addEventListener("click", () => {
      const item = q.closest(".faq-item");
      item.classList.toggle("open");
    });
  });

  // filter bar
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.dataset.cat;
      document.querySelectorAll(".product-card").forEach(card => {
        card.style.display = (!cat || card.dataset.cat === cat) ? "" : "none";
      });
    });
  });

  // newsletter form
  const nlForm = document.getElementById("newsletter-form");
  if (nlForm) nlForm.addEventListener("submit", e => {
    e.preventDefault();
    const email = nlForm.querySelector("input").value;
    if (!email) return;
    nlForm.reset();
    toast("¡SUSCRITO!", "Te avisaremos de cada nuevo drop.", "success");
  });

  // contact form
  const ctForm = document.getElementById("contact-form");
  if (ctForm) ctForm.addEventListener("submit", e => {
    e.preventDefault();
    const btn = ctForm.querySelector(".form-submit");
    btn.textContent = "ENVIANDO...";
    btn.disabled = true;
    setTimeout(() => {
      ctForm.reset();
      btn.textContent = "ENVIAR MENSAJE";
      btn.disabled = false;
      toast("¡MENSAJE ENVIADO!", "Te respondemos en menos de 24 horas.", "success");
    }, 800);
  });
});

function openMobileMenu() {
  const m = document.getElementById("mobile-menu");
  if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; }
}
function closeMobileMenu() {
  const m = document.getElementById("mobile-menu");
  if (m) { m.classList.remove("open"); document.body.style.overflow = ""; }
}
