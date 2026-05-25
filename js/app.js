// Global Application Logic for Smart Cafe

const getLocalData = (key, defaultVal) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
  } catch (e) {
    console.warn(`Error parsing ${key} from localStorage`, e);
    return defaultVal;
  }
};

const App = {
  state: {
    cart: getLocalData('smartCafeCart', []),
    wishlist: getLocalData('smartCafeWishlist', []),
    user: getLocalData('smartCafeUser', null),
  },

  init() {
    console.log('Smart Café App Initialized ☕');
    this.applyTheme();
    this.checkTableQR();
    this.updateCartBadge();
    this.checkAuth();
    this.updateNavProfile();
    this.updateLoyaltyBadge();
  },

  updateLoyaltyBadge() {
    const badge = document.getElementById('loyalty-badge');
    const menuBadge = document.getElementById('menu-loyalty-pts');
    
    if (this.state.user) {
      const points = this.state.user.points || 0;
      const ptsText = `💎 ${points} PTS`;
      
      if (badge) badge.innerHTML = ptsText;
      if (menuBadge) menuBadge.innerHTML = ptsText;
      
      // Update color based on points (Tiers)
      const color = points >= 1000 ? '#e5e4e2' : (points >= 500 ? '#ffd700' : (points >= 200 ? '#c0c0c0' : 'var(--accent-color)'));
      if (badge) badge.style.color = color;
    }
  },

  updateNavProfile() {
    const navPic = document.getElementById('navProfilePic');
    const placeholder = document.getElementById('profilePlaceholder');
    
    if (this.state.user) {
      if (navPic) {
        if (this.state.user.profilePic) {
          navPic.src = this.state.user.profilePic;
          navPic.style.display = 'block';
          if (placeholder) placeholder.style.display = 'none';
        } else {
          navPic.style.display = 'none';
          if (placeholder) placeholder.style.display = 'block';
        }
      }
    }
  },

  // Theme Management
  applyTheme() {
    const theme = localStorage.getItem('smartCafeTheme') || 'dark';
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    if (newTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    
    localStorage.setItem('smartCafeTheme', newTheme);
    this.showToast(`${newTheme === 'light' ? '☀️ Light' : '🌙 Dark'} mode activated`, 'info');
  },

  checkTableQR() {
    const params = new URLSearchParams(window.location.search);
    const table = params.get('table');
    if (table) {
      localStorage.setItem('smartCafeTable', table);
      if (!this.state.user) {
        // Auto login for seamless QR ordering
        this.state.user = { email: `table${table}@guest.com`, name: `Table ${table} Guest`, points: 0 };
        this.saveState();
      }
      // Only show toast if we just landed on index or root
      if (window.location.pathname.endsWith('/') || window.location.pathname.includes('index.html')) {
          setTimeout(() => window.location.href = 'menu.html', 500);
      }
    }
  },

  // State Management
  saveState() {
    try {
      localStorage.setItem('smartCafeCart', JSON.stringify(this.state.cart));
      localStorage.setItem('smartCafeWishlist', JSON.stringify(this.state.wishlist));
      localStorage.setItem('smartCafeUser', JSON.stringify(this.state.user));
      this.updateCartBadge();
      this.updateNavProfile();
      this.updateLoyaltyBadge();
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  },

  // Authentication
  login(userData) {
    this.state.user = { 
      points: 0, 
      profilePic: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
      ...userData
    };
    this.saveState();
    this.showToast(`Greetings, ${this.state.user.name || 'User'}! Stepping into your coffee sanctuary...`, 'success');
  },

  updateProfile(updates) {
    if (this.state.user) {
      this.state.user = { ...this.state.user, ...updates };
      this.saveState();
      this.showToast('Profile updated successfully!', 'success');
      return true;
    }
    return false;
  },

  logout() {
    this.state.user = null;
    this.saveState();
    window.location.href = 'index.html';
  },

  checkAuth() {
    // If on a protected page and not logged in, redirect
    const path = window.location.pathname;
    if ((path.includes('home') || path.includes('menu') || path.includes('cart') || path.includes('dashboard')) && !this.state.user) {
      window.location.href = 'index.html';
    }
  },

  // Cart Operations
  addToCart(item, customOptions = {}) {
    const existingItem = this.state.cart.find(i => i.id === item.id && JSON.stringify(i.options) === JSON.stringify(customOptions));
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.state.cart.push({ ...item, options: customOptions, quantity: 1 });
    }
    
    this.saveState();
    this.showToast(`${item.name} added to cart ☕`, 'success');
  },

  removeFromCart(index) {
    this.state.cart.splice(index, 1);
    this.saveState();
    // Trigger re-render if on cart page
    if (window.renderCart) window.renderCart();
  },

  updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (badge) {
      const count = this.state.cart.reduce((total, item) => total + item.quantity, 0);
      badge.textContent = count;
      badge.style.display = count > 0 ? 'block' : 'none';
    }
  },

  // Wishlist Operations
  toggleWishlist(item) {
    const index = this.state.wishlist.findIndex(i => i.id === item.id);
    if (index >= 0) {
      this.state.wishlist.splice(index, 1);
      this.showToast(`${item.name} removed from wishlist`, 'info');
    } else {
      this.state.wishlist.push(item);
      this.showToast(`${item.name} added to wishlist ❤️`, 'success');
    }
    this.saveState();
  },

  isInWishlist(itemId) {
    return this.state.wishlist.some(i => i.id === itemId);
  },

  // UI Utilities
  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // Modal Utilities
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('active');
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
  }
};

// Initialize App on load
document.addEventListener('DOMContentLoaded', () => App.init());
