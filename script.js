// Cart functionality
let cart = [];
let cartCountElement = document.getElementById('cart-count');
let cartItemsElement = document.getElementById('cart-items');
let cartTotalElement = document.getElementById('cart-total');

// Function to update cart count and total
function updateCart() {
    let total = 0;
    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsElement.innerHTML += `
                <p>${item.name} - $${item.price.toFixed(2)} 
                <button onclick="removeFromCart(${index})">Remove</button></p>
            `;
        });
    }

    cartCountElement.textContent = cart.length;
    cartTotalElement.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
}

// Function to add items to cart
function addToCart(name, price) {
    cart.push({ name, price });
    updateCart();
}

// Function to remove items from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Event listener for "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        addToCart(name, price);
    });
});

// Checkout button action
document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Proceeding to checkout');
        cart = [];
        updateCart();
    } else {
        alert('Your cart is empty!');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-button');
    const items = document.querySelectorAll('.item-card');

    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            console.log(`Filtering by: ${filter}`);  // Debugging log to check what filter is clicked

            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Show/hide items based on the selected filter
            items.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                console.log(`Item categories: ${categories}`);  // Debugging log to check item categories

                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';  // Show item if it matches the filter
                } else {
                    item.style.display = 'none';  // Hide item if it doesn't match
                }
            });
        });
    });

    // Default to showing all items
    document.querySelector('.filter-button[data-filter="all"]').click();
});
