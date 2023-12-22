import { menuArray as menu } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

const menuItems = document.getElementById('menu-items')
const completeOrderBtn = document.getElementById('complete-order')
const orderSection = document.getElementById('order-section')
const modalSection = document.getElementById('modal-section')
const payBtn = document.getElementById('pay')
const messageBanner = document.getElementById('message-banner-section')

let order = []

completeOrderBtn.addEventListener('click', event => modalSection.style.display = 'block' )

payBtn.addEventListener('submit', e => {    
    e.preventDefault()
    order = []
    orderSection.style.display = 'none'
    modalSection.style.display = 'none'
    messageBanner.style.display = 'block'
})

document.addEventListener('click', e => {
    if(e.target.dataset.add) {
        addItemToOrderArray(e.target.dataset.add)
    }
})





function addItemToOrderArray(orderItem) {
    const itemDetailsObj = menu.filter(function (item) {
        return item.name === orderItem
    })[0]
    
    order.push({name: itemDetailsObj.name, price: itemDetailsObj.price, uuid: uuidv4()})
    renderOrderList()  
}

function renderOrderList() {
    let totalPrice = 0
       
    const orderList = document.getElementById('order-list')
    const total = document.getElementById('total-price')
    
    const orderItems = order.map(item => {
        totalPrice += item.price
        return `<div class="order-item">
                    <div class="font-20">${item.name}</div>
                    <div class="remove-order" data-remove="${item.uuid}">remove</div>
                    <div class="right">$${item.price}</div>
                </div>`
    }).join('')
    
    orderList.innerHTML = orderItems
    total.textContent = `$${totalPrice}`
    
    if(order.length) {
        orderSection.style.display = 'block'
    } else {
        orderSection.style.display = 'none'
    }
}

document.addEventListener('click', function(e) {
    if(e.target.dataset.remove) {
        removeItemFromOrderArray(e.target.dataset.remove)
    }
})

function removeItemFromOrderArray(itemId) {
    order = order.filter(item => {
        return item.uuid != itemId
    })
    renderOrderList()
}


function render() {
    return menu.map(item => {
        return `<div class="item">
                    <div class="emoji">${item.emoji}</div>
                    <div>
                        <h2 class="item-name">${item.name}</h2>
                        <p class="item-ingredients">${item.ingredients.join(',')}</p>
                        <h3 class="item-price">$${item.price}</h3>
                    </div>
                    <button class="add-btn right" data-add="${item.name}">+</button>
                </div>
                <hr>`
    }).join('')   
}

menuItems.innerHTML = render()
