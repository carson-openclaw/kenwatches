// functions.js
// Simulated backend + rendering helpers for multiple sections

// ── New Arrivals (already existing) ─────────────────────────────────────
const mockNewArrivals = [
  {
    id: "rolex-submariner-116610LN",
    name: "Rolex Submariner",
    reference: "116610LN",
    price: "$14,800",
    condition: "Brand New",
    image: "images/watches/rolex-submariner.png",
    alt: "Rolex Submariner",
    brand: "Rolex",
    series: "Submariner Date",
    size: "41mm",
    gender: "Men",
    function: "Date",
    material: "Stainless Steel",
    movement: "Automatic",
    year: "2025",
    remark: "",
    box: "Yes",
    paper: "Yes",
    location: "Causeway Bay Store",
    enquiry: "+852 6999 9992",
    priceType: "Cash"
  },
  {
    id: "omega-seamaster-21030422001001",
    name: "Omega Seamaster",
    reference: "210.30.42.20.01.001",
    price: "$6,950",
    condition: "Used",
    image: "images/watches/omega-seamaster.png",
    alt: "Omega Seamaster",
    brand: "Omega",
    series: "Seamaster Diver 300M",
    size: "42mm",
    gender: "Men",
    function: "Date",
    material: "Stainless Steel",
    movement: "Automatic",
    year: "2023",
    remark: "With full stickers",
    box: "Yes",
    paper: "Yes",
    location: "Wan Chai Store",
    enquiry: "+852 6999 9996",
    priceType: "Cash"
  },
  {
    id: "tag-heuer-carrera-cbg2a1z-ba0658",
    name: "TAG Heuer Carrera",
    reference: "CBG2A1Z.BA0658",
    price: "$5,200",
    condition: "99% New",
    image: "images/watches/tag-heuer-carrera.png",
    alt: "TAG Heuer Carrera",
    brand: "TAG Heuer",
    series: "Carrera Chronograph",
    size: "44mm",
    gender: "Men",
    function: "Chronograph, Date",
    material: "Stainless Steel",
    movement: "Automatic",
    year: "2024",
    remark: "Light blue dial",
    box: "Yes",
    paper: "No",
    location: "Causeway Bay Store",
    enquiry: "+852 6999 9992",
    priceType: "Cash"
  },
  {
    id: "patek-philippe-nautilus-57111a010",
    name: "Patek Philippe Nautilus",
    reference: "5711/1A-010",
    price: "$89,000",
    condition: "Brand New",
    image: "images/watches/patek-philippe-nautilus.png",
    alt: "Patek Philippe Nautilus",
    brand: "Patek Philippe",
    series: "Nautilus",
    size: "40mm",
    gender: "Men",
    function: "Date",
    material: "Stainless Steel",
    movement: "Automatic",
    year: "2024",
    remark: "",
    box: "Yes",
    paper: "Yes",
    location: "Central Store",
    enquiry: "+852 6999 9992",
    priceType: "Cash"
  },
  {
    id: "rolex-daytona-116500ln",
    name: "Rolex Daytona",
    reference: "116500LN",
    price: "$42,500",
    condition: "Brand New",
    image: "images/watches/rolex-daytona.png",
    alt: "Rolex Daytona",
    brand: "Rolex",
    series: "Cosmograph Daytona",
    size: "40mm",
    gender: "Men",
    function: "Chronograph",
    material: "Stainless Steel, Ceramic",
    movement: "Automatic",
    year: "2025",
    remark: "Black ceramic bezel",
    box: "Yes",
    paper: "Yes",
    location: "Causeway Bay Store",
    enquiry: "+852 6999 9992",
    priceType: "Cash"
  }
];

async function getNewArrivals() {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockNewArrivals), 400 + Math.random() * 600);
  });
}

function createWatchCard(watch) {
  const placeholderSVG = getWatchPlaceholderSVG();
  return `
    <div class="watch-card" data-watch-id="${watch.id}" style="cursor:pointer;" onclick="if(!event.target.closest('.bookmark-heart'))window.location.href='product.html?id=${watch.id}'">
      <div class="watch-image-container">
        <div class="bookmark-heart" onclick="event.stopPropagation();handleBookmarkClick('${watch.id}')" title="Add to bookmarks">
          <i class="fa-regular fa-heart"></i>
        </div>
        <img src="${watch.image}" alt="${watch.alt}" class="watch-img" onerror="this.src='${placeholderSVG}'">
      </div>
      <div class="watch-info">
        <h3>${watch.name}</h3>
        <div class="watch-reference">${watch.reference}</div>
        <p class="price">${watch.price}</p>
        <span class="condition">${watch.condition}</span>
      </div>
    </div>
  `;
}

// ── Shop page watches ────────────────────────────────────────────────────
const mockShopWatches = [
  {
    id: "omega-aqua-terra-blue-22010412103001",
    brand: "Omega",
    price: 7100,
    condition: "Brand New",
    material: "Stainless Steel",
    movement: "Automatic",
    image: "images/watches/omega-aqua-terra-blue.svg",
    alt: "Omega Seamaster Aqua Terra 150M Blue Dial",
    name: "Seamaster Aqua Terra 150M",
    reference: "220.10.41.21.03.001",
    priceDisplay: "$7,100",
    conditionClass: "new",
    conditionText: "Brand New",
    series: "Seamaster Aqua Terra 150M",
    size: "41mm",
    gender: "Men",
    function: "Date",
    year: "2025",
    remark: "",
    box: "Yes",
    paper: "Yes",
    location: "Causeway Bay Store",
    enquiry: "+852 6999 9992",
    priceType: "Cash"
  },
  {
    id: "omega-aqua-terra-black-22010412101002",
    brand: "Omega",
    price: 7400,
    condition: "Brand New",
    material: "Stainless Steel",
    movement: "Automatic",
    image: "images/watches/omega-aqua-terra-black.svg",
    alt: "Omega Seamaster Aqua Terra 150M Black Dial",
    name: "Seamaster Aqua Terra 150M",
    reference: "220.10.41.21.01.002",
    priceDisplay: "$7,400",
    conditionClass: "new",
    conditionText: "Brand New",
    series: "Seamaster Aqua Terra 150M",
    size: "41mm",
    gender: "Men",
    function: "Date",
    year: "2025",
    remark: "",
    box: "Yes",
    paper: "Yes",
    location: "Wan Chai Store",
    enquiry: "+852 6999 9996",
    priceType: "Cash"
  },
  {
    id: "omega-aqua-terra-green-22013412110001",
    brand: "Omega",
    price: 8200,
    condition: "Brand New",
    material: "Stainless Steel",
    movement: "Automatic",
    image: "images/watches/omega-aqua-terra-green.svg",
    alt: "Omega Seamaster Aqua Terra 150M Green Dial",
    name: "Seamaster Aqua Terra 150M",
    reference: "220.13.41.21.10.001",
    priceDisplay: "$8,200",
    conditionClass: "new",
    conditionText: "Brand New",
    series: "Seamaster Aqua Terra 150M",
    size: "41mm",
    gender: "Men",
    function: "Date",
    year: "2025",
    remark: "Green dial with teak pattern",
    box: "Yes",
    paper: "Yes",
    location: "Causeway Bay Store",
    enquiry: "+852 6999 9992",
    priceType: "Cash"
  },
  {
    id: "omega-aqua-terra-rubber-22012412103002",
    brand: "Omega",
    price: 6900,
    condition: "Used",
    material: "Stainless Steel",
    movement: "Automatic",
    image: "images/watches/omega-aqua-terra-rubber.svg",
    alt: "Omega Seamaster Aqua Terra 150M Rubber Strap",
    name: "Seamaster Aqua Terra 150M",
    reference: "220.12.41.21.03.002",
    priceDisplay: "$6,900",
    conditionClass: "used",
    conditionText: "Used",
    series: "Seamaster Aqua Terra 150M",
    size: "41mm",
    gender: "Men",
    function: "Date",
    year: "2023",
    remark: "Blue dial, rubber strap",
    box: "No",
    paper: "No",
    location: "Central Store",
    enquiry: "+852 6999 9992",
    priceType: "Cash"
  },
  {
    id: "omega-aqua-terra-38-22010382003001",
    brand: "Omega",
    price: 7100,
    condition: "Brand New",
    material: "Stainless Steel",
    movement: "Automatic",
    image: "images/watches/omega-aqua-terra-38.svg",
    alt: "Omega Seamaster Aqua Terra 38mm",
    name: "Seamaster Aqua Terra 150M 38mm",
    reference: "220.10.38.20.03.001",
    priceDisplay: "$7,100",
    conditionClass: "new",
    conditionText: "Brand New",
    series: "Seamaster Aqua Terra 150M",
    size: "38mm",
    gender: "Women",
    function: "Date",
    year: "2025",
    remark: "",
    box: "Yes",
    paper: "Yes",
    location: "Causeway Bay Store",
    enquiry: "+852 6999 9992",
    priceType: "Cash"
  }
  // You can add many more items here later
];

async function getShopWatches() {
  // Simulated async fetch — later replace with real API call
  return new Promise(resolve => {
    setTimeout(() => resolve(mockShopWatches), 500 + Math.random() * 700);
  });
}

function createShopWatchCard(watch) {
  const placeholderSVG = getWatchPlaceholderSVG();
  return `
    <div class="watch-card shop-watch-card"
         data-watch-id="${watch.id}"
         data-brand="${watch.brand}"
         data-price="${watch.price}"
         data-condition="${watch.condition}"
         data-material="${watch.material}"
         data-movement="${watch.movement}"
         style="cursor:pointer;"
         onclick="if(!event.target.closest('.bookmark-heart'))window.location.href='product.html?id=${watch.id}'">
      <div class="watch-image-container">
        <div class="bookmark-heart" onclick="event.stopPropagation();handleBookmarkClick('${watch.id}')" title="Add to bookmarks">
          <i class="fa-regular fa-heart"></i>
        </div>
        <img src="${watch.image}" alt="${watch.alt}" class="watch-img" onerror="this.src='${placeholderSVG}'">
      </div>
      <div class="watch-info">
        <h3>${watch.name || watch.model}</h3>
        <div class="watch-reference">${watch.reference}</div>
        <p class="price">${watch.priceDisplay}</p>
        <span class="condition ${watch.conditionClass}">${watch.conditionText}</span>
      </div>
    </div>
  `;
}

// ── New Arrivals rendering (unchanged) ──────────────────────────────────
async function renderNewArrivals() {
  const container = document.querySelector('.watch-scroller');
  if (!container) return;

  container.innerHTML = '<p class="loading">Loading new arrivals...</p>';

  try {
    const watches = await getNewArrivals();
    if (!watches?.length) {
      container.innerHTML = '<p>No new arrivals available right now.</p>';
      return;
    }
    container.innerHTML = watches.map(createWatchCard).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = '<p class="error">Could not load new arrivals.</p>';
  }
}

document.addEventListener('DOMContentLoaded', renderNewArrivals);

// ── Bookmark Functions ─────────────────────────────────────────────────
async function getBookmarks() {
  try {
    const response = await fetch('/api/bookmarks');
    if (response.ok) {
      const data = await response.json();
      return data.bookmarks || [];
    } else if (response.status === 401) {
      // Not logged in
      return [];
    } else {
      console.error('Failed to fetch bookmarks:', response.status);
      return [];
    }
  } catch (err) {
    console.error('Error fetching bookmarks:', err);
    return [];
  }
}

async function toggleBookmark(watchId) {
  try {
    const response = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ watchId })
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      // Not logged in
      return { error: 'not_logged_in' };
    } else {
      const data = await response.json();
      console.error('Failed to toggle bookmark:', data);
      return { error: data.error || 'unknown' };
    }
  } catch (err) {
    console.error('Error toggling bookmark:', err);
    return { error: 'network' };
  }
}

function isLoggedIn() {
  // Check if there's a user session by trying to fetch /api/me
  // This is a simplified check; actual check happens in the backend
  return window.currentUser !== null && window.currentUser !== undefined;
}

function showSignupPrompt() {
  showBookmarkSignupPrompt();
}

function showBookmarkSignupPrompt() {
  // Create modal if it doesn't exist
  let overlay = document.getElementById('bookmarkSignupOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'bookmarkSignupOverlay';
    overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:3000;align-items:center;justify-content:center;';
    overlay.innerHTML = `
      <div style="background:#1a1a1a;border-radius:16px;padding:2.5rem;max-width:400px;width:90%;text-align:center;border:1px solid #333;">
        <i class="fas fa-heart" style="font-size:2.5rem;color:#ff4757;margin-bottom:1rem;display:block;"></i>
        <h2 style="font-size:1.5rem;margin-bottom:0.8rem;">Login Required</h2>
        <p style="color:#999;margin-bottom:1.5rem;line-height:1.5;">You need to be logged in to save watches to your bookmarks.</p>
        <button onclick="showAuthModal('login');hideBookmarkSignupPrompt();" style="display:block;width:100%;padding:1rem;background:#c49a6c;color:#000;border:none;border-radius:50px;font-size:1.1rem;font-weight:600;cursor:pointer;margin-bottom:0.8rem;">Login</button>
        <button onclick="showAuthModal('register');hideBookmarkSignupPrompt();" style="display:block;width:100%;padding:1rem;background:transparent;color:#c49a6c;border:2px solid #c49a6c;border-radius:50px;font-size:1.1rem;font-weight:600;cursor:pointer;margin-bottom:0.8rem;">Create Account</button>
        <button onclick="hideBookmarkSignupPrompt()" style="background:none;border:none;color:#888;cursor:pointer;font-size:0.95rem;padding:0.5rem;">Cancel</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  overlay.style.display = 'flex';
}

function hideBookmarkSignupPrompt() {
  const overlay = document.getElementById('bookmarkSignupOverlay');
  if (overlay) overlay.style.display = 'none';
}

// SVG placeholder for missing images
function getWatchPlaceholderSVG() {
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%231a1a1a'/%3E%3Ccircle cx='100' cy='100' r='80' fill='%23222' stroke='%23c49a6c' stroke-width='2'/%3E%3Ccircle cx='100' cy='100' r='60' fill='%23222' stroke='%23c49a6c' stroke-width='1'/%3E%3Cline x1='100' y1='100' x2='160' y2='100' stroke='%23c49a6c' stroke-width='3'/%3E%3Cline x1='100' y1='100' x2='100' y2='60' stroke='%23c49a6c' stroke-width='3'/%3E%3Ccircle cx='100' cy='100' r='6' fill='%23c49a6c'/%3E%3Ctext x='100' y='180' text-anchor='middle' fill='%23c49a6c' font-size='14' font-family='sans-serif'%3EWatch%3C/text%3E%3C/svg%3E";
}

// You can also export functions if using modules later:
// export { getNewArrivals, createWatchCard, getShopWatches, createShopWatchCard };

// Simulated backend responses - static data
async function getAvailableBrands() {
  // You can later replace with real fetch('/api/brands')
  return [
    { value: "lange",              label: "A. Lange & Sohne" },
    { value: "rolex",              label: "Rolex" },
    { value: "omega",               label: "Omega" },
    { value: "tag-heuer",           label: "TAG Heuer" },
    { value: "patek-philippe",      label: "Patek Philippe" },
    { value: "audemars-piguet",     label: "Audemars Piguet" },
    { value: "cartier",             label: "Cartier" },
    { value: "breitling",           label: "Breitling" },
    { value: "iwc",                 label: "IWC" },
    { value: "tudor",               label: "Tudor" },
    { value: "vacheron-constantin", label: "Vacheron Constantin" },
    { value: "jaeger-lecoultre",    label: "Jaeger-LeCoultre" },
    { value: "panerai",             label: "Panerai" }
  ];
}

async function getAvailableConditions() {
  return [
    { value: "new",         label: "New" },
    { value: "ninenine-new", label: "99% New" },
    { value: "used",        label: "Used" },
    { value: "vintage",     label: "Vintage" },
    { value: "like-new",    label: "Like New" },
    { value: "very-good",   label: "Very Good" }
  ];
}

// Simulated backend responses - static data for filters
async function getAvailableMaterials() {
  // Real-world luxury watch case materials collected from your list
  return [
    { value: "14k-white-gold",      label: "14k White Gold" },
    { value: "14k-yellow-gold",     label: "14k Yellow Gold" },
    { value: "18k-bic",             label: "18k Bi-Color" },           // assuming "bic" = bi-color
    { value: "18k-pink-gold",       label: "18k Pink Gold" },
    { value: "18k-rose-gold",       label: "18k Rose Gold" },
    { value: "18k-white-gold",      label: "18k White Gold" },
    { value: "18k-yellow-gold",     label: "18k Yellow Gold" },
    { value: "925-silver",          label: "925 Silver" },
    { value: "9k-yellow-gold",      label: "9k Yellow Gold" },
    { value: "aluminium",           label: "Aluminium" },
    { value: "breitlight",          label: "Breitlight" },
    { value: "bronze",              label: "Bronze" },
    { value: "carbon",              label: "Carbon" },
    { value: "carbotech",           label: "Carbotech" },
    { value: "ceramic",             label: "Ceramic" },
    { value: "ceramic-plastic",     label: "Ceramic Plastic" },
    { value: "carbon-fibre",        label: "Carbon Fibre" },
    { value: "coating",             label: "Coating" },
    { value: "composite",           label: "Composite" },
    { value: "ergal",               label: "Ergal" },
    { value: "forged-carbon",       label: "Forged Carbon" },
    { value: "gunmetal",            label: "Gunmetal" },
    { value: "gold-plated",         label: "Gold Plated" },
    { value: "hublonium",           label: "Hublonium" },
    { value: "kevlar",              label: "Kevlar" },
    { value: "magnesium",           label: "Magnesium" },
    { value: "ntpt-carbon",         label: "NTPT Carbon" },
    { value: "950-palladium",       label: "950 Palladium" },
    { value: "950-platinum",        label: "950 Platinum" },
    { value: "rubber",              label: "Rubber" },
    { value: "stainless-steel",     label: "Stainless Steel" },
    { value: "tantalum",            label: "Tantalum" },
    { value: "tegimented",          label: "Tegimented" },
    { value: "texalium",            label: "Texalium" },
    { value: "titanium",            label: "Titanium" },
    { value: "tungsten",            label: "Tungsten" },
    { value: "white-ceramic",       label: "White Ceramic" },
    { value: "zalium",              label: "Zalium" },
    { value: "zirconium",           label: "Zirconium" },
    { value: "bmg-tech",            label: "BMG-tech" },
    { value: "platinum-plated",     label: "Platinum Plated" },
    { value: "ceratanium",          label: "Ceratanium" },
    { value: "eco-titanium",        label: "Eco Titanium" },
    { value: "14k-rose-gold",       label: "14k Rose Gold" },
    { value: "carbo2",              label: "CARBO2" }
  ];
}

async function getAvailableMovements() {
  return [
    { value: "arnos",              label: "Arnos" },
    { value: "automatic",          label: "Automatic" },
    { value: "automatic-quartz",   label: "Automatic and Quartz" },
    { value: "eco-drive",          label: "Eco-Drive" },
    { value: "electronic",         label: "Electronic" },
    { value: "kinetic",            label: "Kinetic" },
    { value: "mechanical-manual",  label: "Mechanical Manual" },
    { value: "quartz",             label: "Quartz" },
    { value: "solar",              label: "Solar" },
    { value: "spring-drive",       label: "Spring Drive" },
    { value: "superquartz",        label: "SuperQuartz" }
  ];
}

// ── Bookmark UI and Interaction ─────────────────────────────────────────
async function handleBookmarkClick(watchId) {
  // Check if user is logged in (using the global currentUser from nav.html)
  if (!window.currentUser) {
    // Show signup prompt modal
    showBookmarkSignupPrompt();
    return;
  }
  
  // Find the heart icon in this card
  const card = document.querySelector(`[data-watch-id="${watchId}"]`);
  if (!card) return;
  const heartIcon = card.querySelector('.bookmark-heart i');
  
  // Show loading state
  heartIcon.className = 'fas fa-spinner fa-spin';
  
  // Toggle bookmark via API
  const result = await toggleBookmark(watchId);
  
  if (result.error === 'not_logged_in') {
    // Should not happen since we checked, but handle anyway
    heartIcon.className = 'fa-regular fa-heart';
    if (window.showAuthModal) {
      showAuthModal('register');
    }
    return;
  }
  
  if (result.error) {
    // API error
    heartIcon.className = 'fa-regular fa-heart';
    console.error('Bookmark toggle failed:', result.error);
    return;
  }
  
  // Success - update icon
  if (result.bookmarked) {
    heartIcon.className = 'fas fa-heart';
    heartIcon.style.color = '#ff4757';
  } else {
    heartIcon.className = 'fa-regular fa-heart';
    heartIcon.style.color = '';
  }
}

// Initialize bookmark hearts after page loads
async function initBookmarks() {
  // Load user bookmarks and update UI
  try {
    const bookmarks = await getBookmarks();
    const bookmarkIds = bookmarks.map(b => b.watchId);
    
    // Update all watch cards on the page
    document.querySelectorAll('[data-watch-id]').forEach(card => {
      const watchId = card.getAttribute('data-watch-id');
      const heartIcon = card.querySelector('.bookmark-heart i');
      if (heartIcon) {
        if (bookmarkIds.includes(watchId)) {
          heartIcon.className = 'fas fa-heart';
          heartIcon.style.color = '#ff4757';
        } else {
          heartIcon.className = 'fa-regular fa-heart';
          heartIcon.style.color = '';
        }
      }
    });
  } catch (err) {
    console.error('Failed to init bookmarks:', err);
  }
}

// Add CSS for bookmark hearts
const bookmarkCSS = `
  .bookmark-heart {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 10;
    background: rgba(0,0,0,0.5);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .bookmark-heart:hover {
    background: rgba(0,0,0,0.7);
    transform: scale(1.1);
  }
  .bookmark-heart i {
    font-size: 18px;
    color: white;
  }
  .bookmark-heart i.fas.fa-heart {
    color: #ff4757;
  }
  .watch-image-container {
    position: relative;
  }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = bookmarkCSS;
  document.head.appendChild(style);
}

// Load Font Awesome if not already loaded
if (typeof document !== 'undefined') {
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(link);
  }
}

// Run initBookmarks when DOM is loaded
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initBookmarks, 500); // Wait a bit for other scripts
  });
}