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

// Modal state
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

// Event listeners for catalogue buttons
document.querySelectorAll('.view-catalog').forEach(btn => {
  btn.addEventListener('click', () => openCatalog(btn.dataset.category));
});

// Also open when clicking the product card image/area
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', (e) => {
    if (e.target.closest('.view-catalog')) return;
    const cat = card.dataset.category;
    if (cat) openCatalog(cat);
  });
});

// Modal close
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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeCatalog();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// Mobile menu toggle
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

// Contact form — open mailto with filled fields
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
