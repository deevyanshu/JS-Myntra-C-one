let bagItems;
onload();

function onload(){
    let bagItemsStr=localStorage.getItem('bagItems');
    
    if(bagItemsStr!=null)
    {
        bagItems=JSON.parse(bagItemsStr);
    }else
    {
        bagItems=[];
    }
displayItemsOnHomePage();
displayBagIcon();
}

function addToBag(ItemId)
{
    bagItems.push(ItemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
}

function displayBagIcon()
{
    let bagItemCountElement= document.querySelector('.bag-item-count');
    if(bagItems.length>0)
    {
        bagItemCountElement.innerText= bagItems.length;
        bagItemCountElement.style.visibility= 'visible'
    }else
    {
      bagItemCountElement.style.visibility= 'hidden';  
    }
    
}

function displayItemsOnHomePage()
{
    let itemsContainerElement= document.querySelector('.items-Container');
    if(itemsContainerElement=== null)
    {
        return;
    }

let innerHTML='';
items.forEach(item => {
    innerHTML+=`
    <div class="item-container">
        <img class="item-image" src="${item.image}" alt="item image">
        <div class="rating">
            ${item.rating.stars} 🌟|${item.rating.count}
        </div>
        <div class="company-name">${item.company}</div>
        <div class="item-name">
            ${item.item_name}
        </div>
        <div class="price">
            <span class="current-price">
                ${item.current_price}
            </span>
            <span class="original-price">${item.original_price}</span>
            <span class="discount">(${item.discount}% off)</span>
        </div>
        <button class="btn-add-bag" onclick="addToBag(${item.id})">
            Add to Bag
        </button>
    </div>`
});

itemsContainerElement.innerHTML=innerHTML;
}