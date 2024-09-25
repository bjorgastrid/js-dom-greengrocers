const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: [],
  totalPrice : 0
};

function renderStoreItems(){
  const storeItemList = document.querySelector(".store--item-list")

  for (let i = 0; i < state.items.length; i++){
    const shopItem = state.items[i]
    let iconAndButton = document.createElement("li")

    let itemIcon = document.createElement("div")
    itemIcon.classList.add("store--item-icon")
    let image = document.createElement("img")
    image.src = `assets\\icons\\${shopItem.id}.svg`
    image.alt = shopItem.name
    itemIcon.appendChild(image)
    iconAndButton.appendChild(itemIcon)

    let button = document.createElement("button")
    button.innerText = "Add to cart"
    button.addEventListener("click", function () {
      addToCart(shopItem)
    })
    itemIcon.appendChild(button)
    iconAndButton.appendChild(button)

    storeItemList.appendChild(iconAndButton)
  }
}

function renderCartItems(){
  const cart = document.querySelector(".cart--item-list")
  cart.innerHTML = ""

  for (let i = 0; i < state.cart.length; i++){
    const cartItem = state.cart[i]
    let iconAndButtons = document.createElement("li")

    let image = document.createElement("img")
    image.classList.add("cart--item-icon")
    image.src = `assets\\icons\\${cartItem.id}.svg`
    image.alt = cartItem.name
    iconAndButtons.appendChild(image)

    let par = document.createElement("p")
    par.innerText = cartItem.name
    iconAndButtons.appendChild(par)

    let downButton = document.createElement("button")
    downButton.classList.add("quantity-btn")
    downButton.classList.add("remove-btn")
    downButton.classList.add("center")
    downButton.innerText = "-"
    downButton.addEventListener("click", function () {
      decreaseQuantity(cartItem)
    })
    iconAndButtons.appendChild(downButton)

    let quantity = document.createElement("span")
    quantity.classList.add("quantity-text")
    quantity.classList.add("center")
    quantity.innerText = cartItem.quantity
    iconAndButtons.appendChild(quantity)

    let upButton = document.createElement("button")
    upButton.classList.add("quantity-btn")
    upButton.classList.add("add-btn")
    upButton.classList.add("center")
    upButton.innerText = "+"
    upButton.addEventListener("click", function () {
      cartItem.quantity++
      state.totalPrice += cartItem.price
      renderCartItems()
    })
    iconAndButtons.appendChild(upButton)

    cart.appendChild(iconAndButtons)
  }

  let total = document.querySelector(".total-number")
  total.innerText = "£" + state.totalPrice.toFixed(2).replace("-0", "0")
}

function addToCart(shopItem){

  let cartItem = state.cart.find((item) => item.id === shopItem.id)

  if(typeof cartItem !== "undefined"){

    cartItem.quantity ++

  }
  else{

    cartItem = {}
    cartItem.id = shopItem.id
    cartItem.name = shopItem.name
    cartItem.price = shopItem.price
    cartItem.quantity = 1

    state.cart.push(cartItem)
  }
  
  state.totalPrice += cartItem.price
  renderCartItems()
}

function decreaseQuantity(cartItem){
  cartItem.quantity--

  if (cartItem.quantity === 0){
    let index = state.cart.indexOf(cartItem)
    state.cart.splice(index, 1)
  }

  state.totalPrice -= cartItem.price
  renderCartItems()
}

renderStoreItems()

