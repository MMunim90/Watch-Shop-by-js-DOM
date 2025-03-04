const ringButtons = document.querySelectorAll(".ring-button");
let productImageBase = "./assets/"
for (let i = 0; i < ringButtons.length; i++) {
  const ringBtn = ringButtons[i];
  ringBtn.addEventListener("click", function (event) {
    const color = event.target.id.replace("-color", "");
    // console.log(color);

    for (let j = 0; j < ringButtons.length; j++) {
      ringButtons[j].classList.remove("border-gray-900");
      ringButtons[j].classList.add("border-gray-300");
    }

    //adding color
    event.target.classList.add("border-gray-900");
    event.target.classList.remove("border-gray-300");

    const productImage = document.getElementById("product-image");
    productImage.src = productImageBase + color + ".jpg";
    //productImage.src = "./assets/pink.jpg";
  });
}

function selectWristSize(size) {
  const sizes = ["S", "M", "L", "XL"];
  for (let i = 0; i < sizes.length; i++) {
    const button = document.getElementById("size-" + sizes[i]);
    const element = sizes[i];
    if (size === element) {
      button.classList.add("border-gray-600");
    } else {
      button.classList.remove("border-gray-600");
    }
  }
}

const quantityElements = document.querySelectorAll(".quantity-button");
for (let btn of quantityElements) {
  btn.addEventListener("click", function (event) {
    const amount = event.target.innerText === "+" ? 1 : -1;
    const quantityElement = document.getElementById("quantity");
    const currentQuantity = parseInt(quantityElement.innerText);
    const newQuantity = Math.max(0, currentQuantity + amount);

    quantityElement.innerText = newQuantity;
  });
}

let cartCount = 0;
let cartItem = [];
document.getElementById("add-to-cart").addEventListener("click", function () {
  const quantity = parseInt(document.getElementById("quantity").innerText);

  if (quantity > 0) {
    document.getElementById("checkout-container").classList.remove("hidden");

    cartCount = cartCount + quantity;
    document.getElementById("cart-count").innerText = cartCount;


    const selectedColorButton = document.querySelector("button.border-gray-900.w-6");
    const selectedColor = selectedColorButton.id.split("-")[0];
    // console.log(selectedColor);

    const selectedSizeButtons = document.querySelector("button.border-gray-600:not(.w-6)");
    // console.log(selectedSizeButtons);

    const selectedSize = selectedSizeButtons.innerText.split(' ')[0];

    const selectedPrice = selectedSizeButtons.innerText.split(' ')[1].split('$')[1];
    // console.log(selectedPrice);

    cartItem.push({
      image: selectedColor + '.jpg',
      title: "Classy Modern Smart Watch",
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: quantity * parseInt(selectedPrice),
    });

    // console.log(cartItem);
  }
  else{
    alert('Please select a quantity...');
  }
});


document.getElementById('checkout-btn').addEventListener('click', function(){
  const cartModal = document.getElementById("cart-modal");

  const cartContainer = document.getElementById("cart-items");
  // const cartTotal = document.getElementById("totaL")

  for(let i=0; i<cartItem.length; i++){
    // console.log(cartItem[i])

    const item = cartItem[i];
    const row = document.createElement('tr');
    row.classList.add("border-b");

    row.innerHTML=`
<td class="py-2 px-4">
  <div class="flex items-center space-x-2">
    <img class="h-12 w-12 object-cover rounded-md" src="${productImageBase}${item.image}" alt="">
    <span class="font-semibold">${item.title}</span>
  </div>
</td>

<td class="py-2 px-4">${item.color}</td>
<td class="py-2 px-4">${item.size}</td>
<td class="py-2 px-4">${item.quantity}</td>
<td class="py-2 px-4">$${item.price}</td>
    `;

    cartContainer.appendChild(row);
  }
  cartModal.classList.remove('hidden');
});

document.getElementById("continue-shopping").addEventListener('click', function(){
  document.getElementById("cart-modal").classList.add('hidden');
})