// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentTheme = localStorage.getItem('theme') || 'light';
let currentPage = 1;
let productsPerPage = 12;
let filteredProducts = [];

// Product Data (Mock API)
const products = [
    {
        id: 1,
        name: "Sony WH-1000XM4 Wireless Headphones",
        category: "headphones",
        price: 349.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 1247,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        description: "Industry-leading noise canceling wireless headphones with 30-hour battery life and exceptional sound quality.",
        colors: ["Black", "Silver", "Blue"],
        specs: {
            "Battery Life": "30 hours",
            "Connectivity": "Bluetooth 5.0",
            "Weight": "254g",
            "Driver Size": "40mm"
        },
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Apple Watch Series 7",
        category: "smartwatches",
        price: 399.99,
        originalPrice: 449.99,
        rating: 4.7,
        reviews: 892,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        description: "The most advanced Apple Watch ever with a larger display, faster charging, and enhanced health features.",
        colors: ["Midnight", "Starlight", "Green"],
        specs: {
            "Display": "Always-On Retina",
            "Battery": "18 hours",
            "Water Resistance": "50m",
            "Processor": "S7"
        },
        badge: "New"
    },
    {
        id: 3,
        name: "Bose QuietComfort 35 II",
        category: "headphones",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.6,
        reviews: 756,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        description: "World-class noise cancellation with balanced audio performance for an immersive listening experience.",
        colors: ["Black", "Silver"],
        specs: {
            "Battery Life": "20 hours",
            "Connectivity": "Bluetooth 4.1",
            "Weight": "234g",
            "Driver Size": "40mm"
        }
    },
    {
        id: 4,
        name: "Samsung Galaxy Watch 5",
        category: "smartwatches",
        price: 279.99,
        originalPrice: 329.99,
        rating: 4.5,
        reviews: 634,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        description: "Advanced health monitoring with durable design and long battery life for active lifestyles.",
        colors: ["Graphite", "Silver", "Pink Gold"],
        specs: {
            "Display": "AMOLED",
            "Battery": "50 hours",
            "Water Resistance": "5ATM",
            "Processor": "Exynos W920"
        }
    },
    {
        id: 5,
        name: "JBL Flip 6 Portable Speaker",
        category: "speakers",
        price: 129.99,
        originalPrice: 149.99,
        rating: 4.4,
        reviews: 445,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        description: "Waterproof portable speaker with powerful sound and 12 hours of playtime.",
        colors: ["Black", "Blue", "Red", "Green"],
        specs: {
            "Battery": "12 hours",
            "Waterproof": "IPX7",
            "Connectivity": "Bluetooth 5.1",
            "Power": "30W"
        }
    },
    {
        id: 6,
        name: "MacBook Pro 14-inch",
        category: "laptops",
        price: 1999.99,
        originalPrice: 2199.99,
        rating: 4.9,
        reviews: 1234,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
        ],
        description: "Powerful laptop with M2 Pro chip, Liquid Retina XDR display, and all-day battery life.",
        colors: ["Space Gray", "Silver"],
        specs: {
            "Processor": "M2 Pro",
            "Memory": "16GB",
            "Storage": "512GB SSD",
            "Display": "14-inch Liquid Retina XDR"
        },
        badge: "Premium"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeSearch();
    initializeCart();
    initializeCarousels();
    initializeProductDetails();
    initializeFilters();
    initializeNewsletter();
    initializeContactForm();
    loadProducts();
    updateCartCount();
    
    // Add scroll animations
    addScrollAnimations();
});

// Theme Management
function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

// Navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                if (currentTheme === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                if (currentTheme === 'dark') {
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                }
            }
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    
    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', function() {
            searchModal.classList.add('active');
            searchInput.focus();
        });
    }
    
    if (searchClose && searchModal) {
        searchClose.addEventListener('click', function() {
            searchModal.classList.remove('active');
        });
    }
    
    // Close search modal when clicking outside
    if (searchModal) {
        searchModal.addEventListener('click', function(e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });
    }
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            }
        });
    }
}

function performSearch(query) {
    const results = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    // Update products display if on products page
    if (window.location.pathname.includes('products.html')) {
        filteredProducts = results;
        currentPage = 1;
        displayProducts();
    }
}

// Cart Management
function initializeCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartClose = document.getElementById('cart-close');
    
    if (cartBtn && cartSidebar) {
        cartBtn.addEventListener('click', function() {
            cartSidebar.classList.add('active');
        });
    }
    
    if (cartClose && cartSidebar) {
        cartClose.addEventListener('click', function() {
            cartSidebar.classList.remove('active');
        });
    }
    
    // Close cart when clicking outside
    if (cartSidebar) {
        cartSidebar.addEventListener('click', function(e) {
            if (e.target === cartSidebar) {
                cartSidebar.classList.remove('active');
            }
        });
    }
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    
    // Show success animation
    showAddToCartAnimation();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

function showAddToCartAnimation() {
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartBtn.style.transform = 'scale(1)';
        }, 200);
    }
}

// Carousel Functionality
function initializeCarousels() {
    // Best sellers carousel
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (carouselTrack && prevBtn && nextBtn) {
        let currentIndex = 0;
        const itemsPerView = window.innerWidth > 768 ? 4 : 1;
        const maxIndex = Math.max(0, products.length - itemsPerView);
        
        function updateCarousel() {
            const translateX = -currentIndex * (100 / itemsPerView);
            carouselTrack.style.transform = `translateX(${translateX}%)`;
            
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }
        
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
        
        // Auto-play carousel
        setInterval(() => {
            if (currentIndex < maxIndex) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            updateCarousel();
        }, 5000);
        
        updateCarousel();
    }
    
    // Related products carousel
    const relatedTrack = document.getElementById('related-products-track');
    const relatedPrev = document.getElementById('related-prev');
    const relatedNext = document.getElementById('related-next');
    
    if (relatedTrack && relatedPrev && relatedNext) {
        let currentIndex = 0;
        const itemsPerView = window.innerWidth > 768 ? 4 : 1;
        const maxIndex = Math.max(0, products.length - itemsPerView);
        
        function updateRelatedCarousel() {
            const translateX = -currentIndex * (100 / itemsPerView);
            relatedTrack.style.transform = `translateX(${translateX}%)`;
            
            relatedPrev.disabled = currentIndex === 0;
            relatedNext.disabled = currentIndex >= maxIndex;
        }
        
        relatedPrev.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateRelatedCarousel();
            }
        });
        
        relatedNext.addEventListener('click', function() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateRelatedCarousel();
            }
        });
        
        updateRelatedCarousel();
    }
}

// Product Details
function initializeProductDetails() {
    // Check if we're on product details page
    if (window.location.pathname.includes('product-details.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        
        if (productId) {
            loadProductDetails(productId);
        }
    }
    
    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id'));
            const quantity = parseInt(document.getElementById('quantity-input').value);
            
            if (productId) {
                addToCart(productId, quantity);
                this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
                this.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
                    this.style.background = '';
                }, 2000);
            }
        });
    }
    
    // Quantity controls
    const qtyDecrease = document.getElementById('qty-decrease');
    const qtyIncrease = document.getElementById('qty-increase');
    const qtyInput = document.getElementById('quantity-input');
    
    if (qtyDecrease && qtyIncrease && qtyInput) {
        qtyDecrease.addEventListener('click', function() {
            const currentValue = parseInt(qtyInput.value);
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });
        
        qtyIncrease.addEventListener('click', function() {
            const currentValue = parseInt(qtyInput.value);
            qtyInput.value = currentValue + 1;
        });
    }
    
    // Product tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            document.getElementById(`${targetTab}-tab`).classList.add('active');
        });
    });
    
    // Image zoom
    const zoomBtn = document.getElementById('zoom-btn');
    const zoomModal = document.getElementById('zoom-modal');
    const zoomClose = document.getElementById('zoom-close');
    const zoomedImage = document.getElementById('zoomed-image');
    
    if (zoomBtn && zoomModal) {
        zoomBtn.addEventListener('click', function() {
            const mainImage = document.getElementById('main-product-image');
            if (mainImage && zoomedImage) {
                zoomedImage.src = mainImage.src;
                zoomModal.classList.add('active');
            }
        });
    }
    
    if (zoomClose && zoomModal) {
        zoomClose.addEventListener('click', function() {
            zoomModal.classList.remove('active');
        });
    }
    
    if (zoomModal) {
        zoomModal.addEventListener('click', function(e) {
            if (e.target === zoomModal) {
                zoomModal.classList.remove('active');
            }
        });
    }
}

function loadProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update page title and meta
    document.title = `${product.name} - TechNest`;
    
    // Update breadcrumb
    const productName = document.getElementById('product-name');
    if (productName) {
        productName.textContent = product.name;
    }
    
    // Update main image
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
        mainImage.src = product.image;
        mainImage.alt = product.name;
    }
    
    // Update thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-images');
    if (thumbnailContainer && product.images) {
        thumbnailContainer.innerHTML = '';
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="${product.name}">`;
            thumbnail.addEventListener('click', function() {
                // Update main image
                mainImage.src = image;
                
                // Update active thumbnail
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
            thumbnailContainer.appendChild(thumbnail);
        });
    }
    
    // Update product info
    const productTitle = document.getElementById('product-title');
    if (productTitle) {
        productTitle.textContent = product.name;
    }
    
    const productRating = document.getElementById('product-rating');
    if (productRating) {
        productRating.textContent = product.rating;
    }
    
    const currentPrice = document.getElementById('current-price');
    if (currentPrice) {
        currentPrice.textContent = `$${product.price}`;
    }
    
    const originalPrice = document.getElementById('original-price');
    if (originalPrice) {
        originalPrice.textContent = `$${product.originalPrice}`;
    }
    
    const discount = document.getElementById('discount');
    if (discount) {
        const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        discount.textContent = `${discountPercent}% OFF`;
    }
    
    const productDescription = document.getElementById('product-description');
    if (productDescription) {
        productDescription.innerHTML = `<p>${product.description}</p>`;
    }
    
    // Update color options
    const colorOptions = document.getElementById('color-options');
    if (colorOptions && product.colors) {
        colorOptions.innerHTML = '';
        product.colors.forEach((color, index) => {
            const colorOption = document.createElement('div');
            colorOption.className = `color-option ${index === 0 ? 'active' : ''}`;
            colorOption.style.backgroundColor = color.toLowerCase();
            colorOption.setAttribute('data-color', color);
            colorOption.addEventListener('click', function() {
                document.querySelectorAll('.color-option').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
            colorOptions.appendChild(colorOption);
        });
    }
    
    // Update detailed description
    const detailedDescription = document.getElementById('detailed-description');
    if (detailedDescription) {
        detailedDescription.innerHTML = `
            <p>${product.description}</p>
            <p>Experience the perfect blend of innovation and quality with our premium ${product.name}. 
            Designed with cutting-edge technology and superior craftsmanship, this product delivers 
            exceptional performance that exceeds expectations.</p>
        `;
    }
    
    // Update specifications
    const specificationsGrid = document.getElementById('specifications-grid');
    if (specificationsGrid && product.specs) {
        specificationsGrid.innerHTML = '';
        Object.entries(product.specs).forEach(([key, value]) => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <span class="spec-label">${key}</span>
                <span class="spec-value">${value}</span>
            `;
            specificationsGrid.appendChild(specItem);
        });
    }
    
    // Load related products
    loadRelatedProducts(product.category, product.id);
}

function loadRelatedProducts(category, excludeId) {
    const relatedTrack = document.getElementById('related-products-track');
    if (!relatedTrack) return;
    
    const relatedProducts = products.filter(p => p.category === category && p.id !== excludeId).slice(0, 4);
    
    relatedTrack.innerHTML = '';
    relatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        relatedTrack.appendChild(productCard);
    });
}

// Product Loading and Display
function loadProducts() {
    if (window.location.pathname.includes('products.html')) {
        filteredProducts = [...products];
        displayProducts();
    } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        loadBestSellers();
    }
}

function displayProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    productsGrid.innerHTML = '';
    
    if (productsToShow.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
    
    updatePagination();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            ${discount > 0 ? `<div class="product-badge" style="background: var(--success-color);">${discount}% OFF</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span>${product.rating}</span>
                <span>(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">$${product.price}</span>
                ${product.originalPrice ? `<span class="original-price">$${product.originalPrice}</span>` : ''}
            </div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    // Add click event to navigate to product details
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('add-to-cart')) {
            window.location.href = `product-details.html?id=${product.id}`;
        }
    });
    
    return card;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function loadBestSellers() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;
    
    // Get best selling products (top 6 by rating)
    const bestSellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 6);
    
    carouselTrack.innerHTML = '';
    bestSellers.forEach(product => {
        const productCard = createProductCard(product);
        carouselTrack.appendChild(productCard);
    });
}

// Filtering and Sorting
function initializeFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const sortSelect = document.getElementById('sort-select');
    const productsSearch = document.getElementById('products-search');
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', applyFilters);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
    
    if (productsSearch) {
        productsSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            applyFilters();
        });
    }
    
    // Check for category parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam && categoryFilter) {
        categoryFilter.value = categoryParam;
        applyFilters();
    }
}

function applyFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const sortSelect = document.getElementById('sort-select');
    const productsSearch = document.getElementById('products-search');
    
    let filtered = [...products];
    
    // Category filter
    if (categoryFilter && categoryFilter.value) {
        filtered = filtered.filter(product => product.category === categoryFilter.value);
    }
    
    // Price filter
    if (priceFilter && priceFilter.value) {
        const [min, max] = priceFilter.value.split('-').map(Number);
        filtered = filtered.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }
    
    // Rating filter
    if (ratingFilter && ratingFilter.value) {
        filtered = filtered.filter(product => product.rating >= parseInt(ratingFilter.value));
    }
    
    // Search filter
    if (productsSearch && productsSearch.value) {
        const query = productsSearch.value.toLowerCase();
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
    }
    
    // Sorting
    if (sortSelect && sortSelect.value) {
        switch (sortSelect.value) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            default:
                // popularity (by rating)
                filtered.sort((a, b) => b.rating - a.rating);
        }
    }
    
    filteredProducts = filtered;
    currentPage = 1;
    displayProducts();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginationNumbers = document.getElementById('pagination-numbers');
    const paginationPrev = document.getElementById('pagination-prev');
    const paginationNext = document.getElementById('pagination-next');
    
    if (paginationNumbers) {
        paginationNumbers.innerHTML = '';
        
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.classList.toggle('active', i === currentPage);
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                displayProducts();
            });
            paginationNumbers.appendChild(pageBtn);
        }
    }
    
    if (paginationPrev) {
        paginationPrev.disabled = currentPage === 1;
        paginationPrev.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProducts();
            }
        });
    }
    
    if (paginationNext) {
        paginationNext.disabled = currentPage === totalPages;
        paginationNext.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                displayProducts();
            }
        });
    }
}

// Newsletter
function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Show success message
            this.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                    <h3>Thank you for subscribing!</h3>
                    <p>You'll receive our latest updates and exclusive offers.</p>
                </div>
            `;
        });
    }
}

// Scroll Animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.category-card, .product-card, .testimonial-card, .stat, .contact-item, .about-image');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Category card click handlers
document.addEventListener('click', function(e) {
    if (e.target.closest('.category-card')) {
        const category = e.target.closest('.category-card').getAttribute('data-category');
        if (category) {
            window.location.href = `products.html?category=${category}`;
        }
    }
});

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelectorAll('input[type="text"]')[1].value;
            const message = this.querySelector('textarea').value;
            
            // Show success message
            this.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success-color); margin-bottom: 1rem;"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us. We'll get back to you soon.</p>
                </div>
            `;
        });
    }
}

// Initialize cart display
updateCartDisplay();

// Initialize contact form
initializeContactForm(); 