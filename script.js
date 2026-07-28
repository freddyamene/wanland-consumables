// —— Product grid ——
const itemGrid = document.getElementById('itemGrid');
const searchInput = document.getElementById('productSearch');
const searchClear = document.getElementById('searchClear');
const searchStatus = document.getElementById('searchStatus');
const searchEmpty = document.getElementById('searchEmpty');
const clearSearchLink = document.getElementById('clearSearchLink');
const filterTabs = document.getElementById('filterTabs');

let activeCat = 'all';

function renderItems() {
  const query = (searchInput.value || '').trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);

  searchClear.hidden = !query;

  const filtered = PRODUCTS.filter(p => {
    if (activeCat !== 'all' && p.cat !== activeCat) return false;
    if (!terms.length) return true;
    const hay = p.name.toLowerCase() + ' ' + (CAT_LABELS[p.cat] || '');
    return terms.every(t => hay.includes(t));
  });

  itemGrid.innerHTML = filtered.map(p => `
    <button type="button" class="item-card" data-cat="${p.cat}" data-page="${p.page}" data-name="${p.name.replace(/"/g, '&quot;')}">
      <span class="item-cat">${CAT_LABELS[p.cat] || p.cat}</span>
      <span class="item-name">${p.name}</span>
      <span class="item-action">View in catalogue →</span>
    </button>
  `).join('');

  if (query || activeCat !== 'all') {
    searchStatus.textContent = `Showing ${filtered.length} of ${PRODUCTS.length} products`;
  } else {
    searchStatus.textContent = `${PRODUCTS.length} products available`;
  }

  searchEmpty.hidden = filtered.length > 0;

  itemGrid.querySelectorAll('.item-card').forEach(btn => {
    btn.addEventListener('click', () => {
      openCatalog(btn.dataset.cat, parseInt(btn.dataset.page, 10), btn.dataset.name);
    });
  });
}

function clearAllFilters() {
  searchInput.value = '';
  activeCat = 'all';
  filterTabs.querySelectorAll('.filter-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.cat === 'all');
  });
  renderItems();
  searchInput.focus();
}

if (searchInput) {
  searchInput.addEventListener('input', renderItems);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Escape') clearAllFilters(); });
}
if (searchClear) searchClear.addEventListener('click', clearAllFilters);
if (clearSearchLink) clearSearchLink.addEventListener('click', clearAllFilters);

filterTabs.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    activeCat = tab.dataset.cat;
    filterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.toggle('active', t === tab));
    renderItems();
  });
});

renderItems();

// —— Catalogue modal ——
let currentCat = null;
let currentPage = 0;

const modal = document.getElementById('catalogModal');
const modalTitle = document.getElementById('modalTitle');
const modalProduct = document.getElementById('modalProduct');
const modalGallery = document.getElementById('modalGallery');
const pageIndicator = document.getElementById('pageIndicator');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');

function openCatalog(cat, page, productName) {
  const pages = CATALOG_PAGES[cat];
  if (!pages) return;
  currentCat = cat;
  currentPage = Math.min(page || 0, pages.length - 1);
  modalTitle.textContent = CAT_LABELS[cat] || cat;
  modalProduct.textContent = productName ? `Showing: ${productName}` : '';
  renderPage();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCatalog() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentCat = null;
}

function renderPage() {
  const pages = CATALOG_PAGES[currentCat];
  if (!pages) return;
  const img = pages[currentPage];
  modalGallery.innerHTML = `<img src="${img}" alt="${CAT_LABELS[currentCat]} page ${currentPage + 1}" loading="eager">`;
  pageIndicator.textContent = `${currentPage + 1} / ${pages.length}`;
  prevBtn.style.opacity = currentPage === 0 ? '0.4' : '1';
  nextBtn.style.opacity = currentPage === pages.length - 1 ? '0.4' : '1';
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === pages.length - 1;
}

document.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeCatalog));

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) { currentPage--; renderPage(); }
});
nextBtn.addEventListener('click', () => {
  const pages = CATALOG_PAGES[currentCat];
  if (pages && currentPage < pages.length - 1) { currentPage++; renderPage(); }
});

document.addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeCatalog();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// —— Mobile menu ——
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
}

// —— Contact form ——
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`Enquiry from ${name} — Wanland Website`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`);
    window.location.href = `mailto:wanlandconsumables@gmail.com?subject=${subject}&body=${body}`;
  });
}
