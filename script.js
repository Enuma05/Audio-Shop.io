let cart = [];
const cartCountElem = document.querySelector('.cart-count');
const cartIconElem = document.querySelector('.cart-icon');
const cartSidebarElem = document.querySelector('.cart-sidebar');
const cartItemsElem = document.querySelector('.cart-items');

// Function to update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElem.textContent = totalItems;
}

// Render cart items in sidebar
function renderCartItems() {
    cartItemsElem.innerHTML = '';
    cart.forEach((item, index) => {
        cartItemsElem.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="40">
                <span>${item.name} - $${item.price}</span>
                <div class="quantity-controls">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            </div>
        `;
    });

    // Attach event listeners for quantity controls and remove buttons
    cartItemsElem.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1); // Remove the item if quantity is 1
            }
            updateCartCount();
            renderCartItems();
        });
    });

    cartItemsElem.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            cart[index].quantity += 1;
            updateCartCount();
            renderCartItems();
        });
    });

    cartItemsElem.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            cart.splice(index, 1); // Remove the item from the cart
            updateCartCount();
            renderCartItems();
        });
    });
}

// Function to display check icon when item is added
function showAddedIcon(product) {
    const addedMessage = product.querySelector('.added-message');
    const addToCartButton = product.querySelector('.add-to-cart');

    // Show the check icon
    addedMessage.style.display = 'block';

    // Hide the "Add to Cart" button
    addToCartButton.style.display = 'none';
    
    // Hide the check icon after 2 seconds
    setTimeout(() => {
        addedMessage.style.display = 'none';
    }, 1000);
}

// Add to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const product = this.closest('.product');
        const productName = product.querySelector('h3').textContent;
        const productPrice = product.querySelector('.price').textContent.replace('$', '');
        const productImage = product.querySelector('img').src;

        // Check if the product already exists in the cart
        const existingProduct = cart.find(item => item.name === productName);
        
        if (existingProduct) {
            // Increment the quantity if the product is already in the cart
            existingProduct.quantity += 1;
        } else {
            // Add new product to the cart
            cart.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
        }

        updateCartCount();
        renderCartItems();
        showAddedIcon(product);
    });
});

// Toggle cart sidebar
cartIconElem.addEventListener('click', function() {
    cartSidebarElem.classList.toggle('open');
});

// Checkout button
document.querySelector('.checkout-btn').addEventListener('click', function() {
    alert('Proceeding to Checkout');
    cart = [];
    updateCartCount();
    renderCartItems();
});

// Close sidebar when 'X' button is clicked
document.querySelector('.close-btn').addEventListener('click', function () {
    document.querySelector('.cart-sidebar').classList.remove('open');
});

// Show the "Add to Cart" button on hover
document.querySelectorAll('.product').forEach(function(product) {
    product.addEventListener('mouseover', function() {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.style.display = 'block';
    });

    product.addEventListener('mouseout', function() {
        const addToCartButton = product.querySelector('.add-to-cart');
        addToCartButton.style.display = 'none';
    });
});







let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const slideInterval = 15000; // Set interval to 20 seconds (20000 milliseconds)

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        dots[i].classList.remove('active');
    });
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function goToSlide(index) {
    currentSlide = index;
    showSlide(currentSlide);
}

// Function to move to the next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to first slide if at end
    showSlide(currentSlide);
}

// Set up auto-slide functionality
setInterval(nextSlide, slideInterval);

// Initialize the first slide as active
showSlide(currentSlide);






