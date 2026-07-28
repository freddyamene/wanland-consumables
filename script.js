// Product catalogue image sets
const catalogues = {
  stationeries: {
    title: 'General Stationeries',
    images: [
      'PRODUCT%20CATALOG%202025%20-%20General%20Stationeries%20(pdf.io)%20(1)/PRODUCT%20CATALOG%202025%20-%20General%20Stationeries-0.jpg',
      'PRODUCT%20CATALOG%202025%20-%20General%20Stationeries%20(pdf.io)%20(1)/PRODUCT%20CATALOG%202025%20-%20General%20Stationeries-1.jpg',
      'PRODUCT%20CATALOG%202025%20-%20General%20Stationeries%20(pdf.io)%20(1)/PRODUCT%20CATALOG%202025%20-%20General%20Stationeries-2.jpg',
      'PRODUCT%20CATALOG%202025%20-%20General%20Stationeries%20(pdf.io)%20(1)/PRODUCT%20CATALOG%202025%20-%20General%20Stationeries-3.jpg',
      'PRODUCT%20CATALOG%202025%20-%20General%20Stationeries%20(pdf.io)%20(1)/PRODUCT%20CATALOG%202025%20-%20General%20Stationeries-4.jpg',
      'PRODUCT%20CATALOG%202025%20-%20General%20Stationeries%20(pdf.io)%20(1)/PRODUCT%20CATALOG%202025%20-%20General%20Stationeries-5.jpg',
      'PRODUCT%20CATALOG%202025%20-%20General%20Stationeries%20(pdf.io)%20(1)/PRODUCT%20CATALOG%202025%20-%20General%20Stationeries-6.jpg',
      'PRODUCT%20CATALOG%202025%20-%20General%20Stationeries%20(pdf.io)%20(1)/PRODUCT%20CATALOG%202025%20-%20General%20Stationeries-7.jpg'
    ]
  },
  inks: {
    title: 'Inks & Toners',
    images: [
      'PRODUCT%20CATALOG%202025%20-%20Inks%20%26%20Toners/PRODUCT%20CATALOG%202025-0.jpg',
      'PRODUCT%20CATALOG%202025%20-%20Inks%20%26%20Toners/PRODUCT%20CATALOG%202025-1.jpg',
      'PRODUCT%20CATALOG%202025%20-%20Inks%20%26%20Toners/PRODUCT%20CATALOG%202025-2.jpg',
      'PRODUCT%20CATALOG%202025%20-%20Inks%20%26%20Toners/PRODUCT%20CATALOG%202025-3.jpg'
    ]
  },
  it: {
    title: 'IT Accessories',
    images: [
      'PRODUCT%20CATALOG%202025%20-%20IT%20ACCESSERIES%20(pdf.io)/PRODUCT%20CATALOG%202025%20-%20IT%20ACCESSERIES-0.jpg',
      'PRODUCT%20CATALOG%202025%20-%20IT%20ACCESSERIES%20(pdf.io)/PRODUCT%20CATALOG%202025%20-%20IT%20ACCESSERIES-1.jpg',
      'PRODUCT%20CATALOG%202025%20-%20IT%20ACCESSERIES%20(pdf.io)/PRODUCT%20CATALOG%202025%20-%20IT%20ACCESSERIES-2.jpg'
    ]
  },
  catering: {
    title: 'Catering & Paper Products',
    images: [
      'PRODUCT%20CATALOG%202025%20-CATERING%20%26%20PAPER%20PRODUCTS%20(1)%20(pdf.io)/PRODUCT%20CATALOG%202025%20-CATERING%20%26%20PAPER%20PRODUCTS%20(1)-0.jpg',
      'PRODUCT%20CATALOG%202025%20-CATERING%20%26%20PAPER%20PRODUCTS%20(1)%20(pdf.io)/PRODUCT%20CATALOG%202025%20-CATERING%20%26%20PAPER%20PRODUCTS%20(1)-1.jpg',
      'PRODUCT%20CATALOG%202025%20-CATERING%20%26%20PAPER%20PRODUCTS%20(1)%20(pdf.io)/PRODUCT%20CATALOG%202025%20-CATERING%20%26%20PAPER%20PRODUCTS%20(1)-2.jpg',
      'PRODUCT%20CATALOG%202025%20-CATERING%20%26%20PAPER%20PRODUCTS%20(1)%20(pdf.io)/PRODUCT%20CATALOG%202025%20-CATERING%20%26%20PAPER%20PRODUCTS%20(1)-3.jpg'
    ]
  },
  ppe: {
    title: 'PPE Consumables',
    images: [
      'PRODUCT%20CATALOG%202025%20-PPE%20CONSUMABLES%20(1)-0.jpg',
      'PRODUCT%20CATALOG%202025%20-PPE%20CONSUMABLES%20(1)-1.jpg',
      'PRODUCT%20CATALOG%202025%20-PPE%20CONSUMABLES%20(1)-2.jpg'
    ]
  }
};

// —— Product Search ——
const searchInput = document.getElementById('productSearch');
const searchClear = document.getElementById('searchClear');
const searchStatus = document.getElementById('searchStatus');
const searchEmpty = document.getElementById('searchEmpty');
const clearSearchLink = document.getElementById('clearSearchLink');
const productCards = document.querySelectorAll('.product-card');

function runSearch() {
  const query = (searchInput.value || '').trim().toLowerCase();
  const terms = query.split(/\s+/).filter(Boolean);

  searchClear.hidden = !query;

  let visible = 0;

  productCards.forEach(card => {
    if (!terms.length) {
      card.classList.remove('hidden');
      visible++;
      return;
    }

    const title = (card.querySelector('h3')?.textContent || '').toLowerCase();
    const desc = (card.querySelector('p')?.textContent || '').toLowerCase();
    const keywords = (card.dataset.keywords || '').toLowerCase();
    const haystack = `${title} ${desc} ${keywords}`;

    const match = terms.every(term => haystack.includes(term));
    card.classList.toggle('hidden', !match);
    if (match) visible++;
  });

  if (!query) {
    searchStatus.textContent = '';
    searchEmpty.hidden = true;
  } else if (visible === 0) {
    searchStatus.textContent = '';
    searchEmpty.hidden = false;
  } else {
    searchStatus.textContent = `Showing ${visible} of ${productCards.length} categories`;
    searchEmpty.hidden = true;
  }
}

function clearSearch() {
  searchInput.value = '';
  runSearch();
  searchInput.focus();
}

if (searchInput) {
  searchInput.addEventListener('input', runSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') clearSearch();
  });
}

if (searchClear) searchClear.addEventListener('click', clearSearch);
if (clearSearchLink) clearSearchLink.addEventListener('click', clearSearch);

// —— Catalogue Modal ——
let currentCategory = null;
let currentPage = 0;

const modal = document.getElementById('catalogModal');
const modalTitle = document.getElementById('modalTitle');
const modalGallery = document.getElementById('modalGallery');
const pageIndicator = document.getElementById('pageIndicator');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');

function openCatalog(category) {
  const cat = catalogues[category];
  if (!cat) return;
  currentCategory = category;
  currentPage = 0;
  modalTitle.textContent = cat.title;
  renderPage();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCatalog() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentCategory = null;
}

function renderPage() {
  const cat = catalogues[currentCategory];
  if (!cat) return;
  const img = cat.images[currentPage];
  modalGallery.innerHTML = `<img src="${img}" alt="${cat.title} - page ${currentPage + 1}" loading="eager">`;
  pageIndicator.textContent = `${currentPage + 1} / ${cat.images.length}`;
  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === cat.images.length - 1;
  prevBtn.style.opacity = currentPage === 0 ? '0.4' : '1';
  nextBtn.style.opacity = currentPage === cat.images.length - 1 ? '0.4' : '1';
}

document.querySelectorAll('.view-catalog').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    openCatalog(btn.dataset.category);
  });
});

document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.view-catalog')) return;
    const cat = card.dataset.category;
    if (cat) openCatalog(cat);
  });
});

document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeCatalog);
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
  }
});

nextBtn.addEventListener('click', () => {
  const cat = catalogues[currentCategory];
  if (cat && currentPage < cat.images.length - 1) {
    currentPage++;
    renderPage();
  }
});

document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeCatalog();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// —— Mobile menu ——
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// —— Contact form ——
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Enquiry from ${name} — Wanland Website`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:wanlandconsumables@gmail.com?subject=${subject}&body=${body}`;
  });
}
