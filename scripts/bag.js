let bagItemsObjects;
onload();
function onload()
{
    loadbagItems();
    displaybagItems();
    displayBagSummary();
}

function displayBagSummary()
{
  let bagSummaryElemnt=document.querySelector('.bag-summary');
  let totalItem=bagItemsObjects.length;
  let totalMRP=0;
  let totalDiscount=0;
  let finalPayment=0;
  const convenienceFee=99;  

  bagItemsObjects.forEach(bagItem=>{
    totalMRP+=bagItem.original_price;
    totalDiscount+=bagItem.original_price-bagItem.current_price;
  })

  if(totalMRP-totalDiscount>0){
      finalPayment=totalMRP-totalDiscount+convenienceFee;    
  }else 
  {
      finalPayment=0;
  }
  

  bagSummaryElemnt.innerHTML=`<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs${totalMRP}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs ${finalPayment}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;
}

function loadbagItems()
{
    bagItemsObjects= bagItems.map(itemId=>{
        for(let i=0;i<bagItems.length;i++)
        {
            if(itemId==items[i].id)
            {
                return items[i];
            }
        }
    });
    console.log(bagItemsObjects);
}

function displaybagItems()
{

    let containerElemnt=document.querySelector('.bag-items-container');
    let innerHtml='';
    bagItemsObjects.forEach(bagItem => {
        innerHtml+=generateItemHtml(bagItem);
    });
    containerElemnt.innerHTML=innerHtml;
}

function removeFromBag(itemId)
{
    bagItems=bagItems.filter(bagItemId=> bagItemId!=itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadbagItems();
    displayBagIcon();
    displaybagItems();
    displayBagSummary();
}

function generateItemHtml(item){
    return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">${item.current_price}</span>
        <span class="original-price">${item.original_price}</span>
        <span class="discount-percentage">${item.discount_percentage}</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period}</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>
    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>`
}
