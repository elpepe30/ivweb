/* Shared navbar + footer + overlay shells */
function injectShell() {
  const marquee = `
  <div class="marquee-wrap">
    <div class="marquee-track">
      <span>DROP LIVE: TOKYO DRIFT COLLECTION</span><span class="marquee-dot"> • </span>
      <span>ENVÍO GRATIS EN PEDIDOS SUPERIORES A RD$6,000</span><span class="marquee-dot"> • </span>
      <span>CANTIDADES LIMITADAS</span><span class="marquee-dot"> • </span>
      <span>ENTREGAS EN TODA LA REPÚBLICA DOMINICANA</span><span class="marquee-dot"> • </span>
      <span>WHATSAPP +1 849 342 4169</span><span class="marquee-dot"> • </span>
      <span>DROP LIVE: TOKYO DRIFT COLLECTION</span><span class="marquee-dot"> • </span>
      <span>ENVÍO GRATIS EN PEDIDOS SUPERIORES A RD$6,000</span><span class="marquee-dot"> • </span>
      <span>CANTIDADES LIMITADAS</span><span class="marquee-dot"> • </span>
      <span>ENTREGAS EN TODA LA REPÚBLICA DOMINICANA</span><span class="marquee-dot"> • </span>
      <span>WHATSAPP +1 849 342 4169</span><span class="marquee-dot"> • </span>
    </div>
  </div>`;

  const navbar = `
  <nav id="navbar" class="at-top">
    <div class="nav-inner">
      <div class="nav-left">
        <a href="mochilas.html">MOCHILAS</a>
        <a href="colabos.html">COLABOS</a>
        <a href="novedades.html">NOVEDADES</a>
      </div>
      <a href="index.html" class="nav-logo">
        <div class="nav-logo-text">DROP<span class="red">YARD</span></div>
        <div class="nav-tagline">OFFICIAL SPRAYGROUND® DEALER</div>
      </a>
      <div class="nav-right">
        <button class="nav-icon-btn" onclick="openSearch()" title="Buscar">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        <button class="nav-icon-btn" onclick="toast('MI CUENTA','Funcionalidad próximamente.')" title="Mi cuenta">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        <button class="nav-icon-btn" onclick="openCart()" title="Carrito" style="position:relative">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <span class="cart-badge" id="cart-badge">0</span>
        </button>
        <button class="mobile-menu-btn" id="mobile-menu-btn" title="Menú">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
  </nav>`;

  const mobileMenu = `
  <div id="mobile-menu">
    <button class="mobile-menu-close" id="mobile-menu-close">
      <svg width="28" height="28" fill="none" stroke="#fff" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="mobile-menu-links">
      <a href="mochilas.html">MOCHILAS</a>
      <a href="colabos.html">COLABOS</a>
      <a href="novedades.html">NOVEDADES</a>
      <a href="historia.html">HISTORIA</a>
      <a href="contacto.html">CONTACTO</a>
    </div>
  </div>`;

  const cartDrawer = `
  <div id="cart-overlay"></div>
  <div id="cart-drawer">
    <div class="cart-header">
      <h2>CARRITO</h2>
      <button class="cart-close-btn" onclick="closeCart()">
        <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="cart-items" id="cart-items">
      <div class="cart-empty">
        <svg width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Tu carrito está vacío</p>
      </div>
    </div>
    <div class="cart-footer" id="cart-footer" style="display:none">
      <div class="cart-row"><span>SUBTOTAL</span><span id="cart-subtotal">RD$0</span></div>
      <div class="cart-row"><span>ENVÍO</span><span id="cart-shipping">—</span></div>
      <p class="free-shipping-hint" id="cart-hint" style="display:none"></p>
      <div class="cart-total-row"><span>TOTAL</span><span class="total-price" id="cart-grand">RD$0</span></div>
      <button class="checkout-btn" id="checkout-btn" onclick="checkout()">FINALIZAR COMPRA →</button>
    </div>
  </div>`;

  const searchModal = `
  <div id="search-overlay">
    <div class="search-box">
      <button class="search-close" onclick="closeSearch()">✕</button>
      <input class="search-input" id="search-input" type="text" placeholder="BUSCAR PRODUCTO..." autocomplete="off">
      <div class="search-results" id="search-results"></div>
    </div>
  </div>`;

  const toastContainer = `<div id="toast-container"></div>`;

  const footer = `
  <footer>
    <div class="footer-grid">
      <div>
        <div style="font-family:'Anton',sans-serif;font-size:2.8rem;letter-spacing:-.03em;color:#fff;line-height:1;margin-bottom:.25rem;">DROP<span style="color:#e11d48">YARD</span></div>
        <p style="font-size:8px;font-weight:700;letter-spacing:.25em;color:#e11d48;text-transform:uppercase;margin-bottom:1rem;">DISTRIBUIDOR OFICIAL · SPRAYGROUND®</p>
        <p class="footer-brand-desc">DROPYARD es la tienda independiente que trae a República Dominicana las mochilas SPRAYGROUND® más buscadas. Producto 100% original, importado y verificado pieza a pieza.</p>
        <div class="footer-socials">
          <a href="https://www.instagram.com/sr.iversonjvr/" target="_blank" class="social-btn" title="Instagram @sr.iversonjvr">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="https://wa.me/18493424169" target="_blank" class="social-btn" title="WhatsApp +1 849 342 4169">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h4>COMPRAR</h4>
        <ul class="footer-links">
          <li><a href="mochilas.html">Mochilas</a></li>
          <li><a href="colabos.html">Colabos</a></li>
          <li><a href="novedades.html">Novedades</a></li>
          <li><a href="mochilas.html">Riñoneras</a></li>
          <li><a href="mochilas.html">Accesorios</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>AYUDA</h4>
        <ul class="footer-links">
          <li><a href="faq.html">FAQ</a></li>
          <li><a href="envios.html">Envíos</a></li>
          <li><a href="devoluciones.html">Devoluciones</a></li>
          <li><a href="contacto.html">Contacto</a></li>
          <li><a href="autenticidad.html">Autenticidad</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>DROPYARD</h4>
        <ul class="footer-links">
          <li><a href="historia.html">Historia</a></li>
          <li><a href="terminos.html">Términos</a></li>
          <li><a href="privacidad.html">Privacidad</a></li>
          <li><a href="cookies.html">Cookies</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2026 DROPYARD SRL · DISTRIBUIDOR INDEPENDIENTE · SPRAYGROUND® ES MARCA REGISTRADA DE SPRAYGROUND LLC</p>
      <div style="display:flex;gap:1.5rem;">
        <a href="terminos.html">TÉRMINOS</a>
        <a href="privacidad.html">PRIVACIDAD</a>
        <a href="cookies.html">COOKIES</a>
      </div>
    </div>
  </footer>`;

  // Inject before </body>
  document.body.insertAdjacentHTML("afterbegin", marquee + navbar + mobileMenu + cartDrawer + searchModal + toastContainer);
  document.body.insertAdjacentHTML("beforeend", footer);
}

document.addEventListener("DOMContentLoaded", injectShell);
