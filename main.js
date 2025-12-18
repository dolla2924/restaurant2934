
document.addEventListener('DOMContentLoaded', () => {
    // ==========================
    // corrected element selections based on HTML CLASSED/ID
    // ==========================
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart_icon span');
    const cartTotal = document.querySelector('.cart-total');
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartIcon = document.getElementById('cart-icon');
    const sidebar = document.getElementById('sidebar');

    let cartItems = [];
    let totalAmount = 0;
    addToCartButtons.forEach((button) => {
        button.addEventListener('click', (event) => {

    // Get item details from the corresponding card
            const cardElement = event.target.closest('.card');
            if (!cardElement) return;

            const name = cardElement.querySelector('.card-title').textContent.trim();
            const priceText = cardElement.querySelector('.price').textContent;
    // corrected price extraction:remove"LE"and parse float
            const price = parseFloat(priceText.replace(' LE', '').trim());
            if (isNaN(price)) return;

            const item = { name, price, quantity: 1 };
            const existingItem = cartItems.find(ci => ci.name === item.name);
            if (existingItem) existingItem.quantity++;
            else cartItems.push(item);

            totalAmount += item.price;
            updateCartUI();
        });
    });

    // ==========================
    // تحديث واجهة السلة
    // ==========================
    function updateCartUI() {
        updateCartItemCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount(count) {
        cartItemCount.textContent = count;
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = '';
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'individual-cart-item');
            cartItem.innerHTML = `
                <span>(${item.quantity}x) ${item.name}</span>
                <span class="cart-item-price">
                    LE ${(item.price * item.quantity).toFixed(2)}
                    <button class="remove-btn" data-index="${index}">
                        <i class="fa-solid fa-xmark"></i> 
                    </button>
                </span>
            `;
            cartItemsList.append(cartItem);
        });

        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                removeItemFromCart(idx);
            });
        });
    }

    function removeItemFromCart(index) {
        const removed = cartItems.splice(index, 1)[0];
        totalAmount -= removed.price * removed.quantity;
        updateCartUI();
    }

    function updateCartTotal() {
        cartTotal.textContent = `LE ${totalAmount.toFixed(2)}`;
    }

    // ==========================
    // فتح وغلق السلة
    // ==========================
    cartIcon.addEventListener('click', () => {
        // اغلق قائمة البرجر لو مفتوحة
        if (navMenu.classList.contains('open')) navMenu.classList.remove('open');
        sidebar.classList.add('open');
    });

    const closeButton = document.querySelector('.sidebar-close');
    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // ==========================
    // عناصر قائمة البرجر (menu bar)
    // ==========================
    const burgerIcon = document.querySelector('.burger'); // الأيقونة الثلاث شرط
    const navMenu = document.getElementById('nav-menu'); // القائمة
    const menuCloseButton = document.querySelector('.menu-close'); // زر X لإغلاق القائمة

    burgerIcon.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) sidebar.classList.remove('open');
        navMenu.classList.add('open');
    });

    menuCloseButton.addEventListener('click', () => {
        navMenu.classList.remove('open');
    });

    // ==========================
    // Checkout و forms
    // ==========================
    const checkoutBtn = document.querySelector('.checkout-btn');
    const dineInBtn = document.getElementById('Dine_btn');
    const takeawayBtn = document.getElementById('Takeaway_btn');
    const deliveryBtn = document.getElementById('Delivery_btn');
    const checkoutOptionsContainer = document.getElementById('checkout-options-container');

    function hideAllSections() {
        document.querySelectorAll('section').forEach(section => {
            if (section.id !== 'sidebar') section.style.display = 'none';
        });
    }

    function showForm(formId) {
        hideAllSections();
        const form = document.getElementById(formId);
        if (form) form.style.display = 'block';
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cartItems.length === 0) {
                alert("Your cart is empty. Please add items before checking out.");
                return;
            }
            sidebar.classList.remove('open');
            hideAllSections();
            if (checkoutOptionsContainer) checkoutOptionsContainer.style.display = 'flex';
        });
    }

    if (dineInBtn) dineInBtn.addEventListener('click', () => showForm('dine_in'));
    if (takeawayBtn) takeawayBtn.addEventListener('click', () => showForm('Takeaway'));
    if (deliveryBtn) deliveryBtn.addEventListener('click', () => showForm('Delivery'));
    // Event listener for video icon to navigate to videos page
//    ه مش ده تعليق  ي هندسه
    const videoIcon = document.getElementById('video-icon');
    videoIcon.addEventListener('click', () => {
        window.location.href = 'videos.html';
    });


    // ==========================
    // تحديث أولي للواجهة
    // ==========================
    updateCartUI();
});
