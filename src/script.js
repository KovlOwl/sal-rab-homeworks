const cart = new Cart();

window.addEventListener('load', () => {
    bindModals();
    bindNotifications();
    loadProductsCards();
    bindCart();
});

function bindCart() {
    cart.shippingSettings = {minForFree: 700, price: 200};
    cart.discountSettings = {minSum: 700, part: 10};
    document.querySelectorAll('.add-in-cart').forEach((btn) => {
        btn.addEventListener('click', () => addInCartBtn(btn));
    })
    document.querySelector('#cart-items-count').innerHTML = '0';
}

function addInCartBtn(btn) {
    cart.addProduct(new Product(btn.dataset.id, btn.dataset.title, btn.dataset.price));
    addInCartNotification(btn.dataset);
    changeCartValues(btn.dataset.price);
    renderCart();
}

function addInCartNotification(...data) {
    try {
        createNotification(addInCartMessage(data.title, data.price));
    } catch (e) {
        createNotification('error', false, 'danger');
    }
}

function changeCartValues(price) {
    const cartCountField = document.querySelector('#cart-items-count');
    const cartSumField = document.querySelector('#cart-items-sum');

    try {
        cartCountField.innerHTML = addInCartCountChange(+cartCountField.innerHTML);
    } catch {
        cartCountField.innerHTML = '0';
    }

    try {
        cartSumField.innerHTML = addInCartSumChange(+/\d+/.exec(cartSumField.innerHTML), +price);
    } catch {
        cartSumField.innerHTML = '0 ₽'
    }
}

function renderCartItem({count, price, title}) {
    const cartItem = document.createElement('div');
    const cartItemTitle = document.createElement('div');
    const cartItemSum = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItemTitle.innerHTML = `${title}`;
    cartItemSum.innerHTML = `${count} × ${price} ₽ = ${price * count} ₽`;
    cartItem.append(cartItemTitle);
    cartItem.append(cartItemSum);
    return cartItem;
}

function renderCartTotal(f) {
    return f;
}

function renderCart() {
    const cartDetails = document.querySelector('#cart-detail');
    cartDetails.innerHTML = '';

    cart.items.forEach((item) => cartDetails.append(renderCartItem(item)));
    cartDetails.append(document.createElement('hr'));

    try {
        cartSumField.innerHTML = addInCartSumChange(+/\d+/.exec(cartSumField.innerHTML), +price);
    } catch {
        cartSumField.innerHTML = '0 ₽'
    }
}