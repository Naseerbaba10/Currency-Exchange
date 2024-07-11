const dropList = document.querySelectorAll("form select"),
  fromCurrency = document.querySelector("form select"),
  toCurrency = document.querySelector(".to select");
  const exchangeRatetxt=document.querySelector(".exchange-rate"),


  getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? "selected" : ""
    } else if (i == 1) {
      selected = currency_code == "INR" ? "selected" : ""
    }
    // console.log(currency_code)
    let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", e =>{
    loadFlag(e.target);
  });
}
  function loadFlag(element){
    for(let code in country_code){
      if(code==element.value){
        let imgTag=element.parentElement.querySelector("img");
        imgTag.src=
        `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;
      }
    }
  }

window.addEventListener("load", ()=> {
 

  getExchangeRate();
});
getButton.addEventListener("click", e => {
  e.preventDefault();

  getExchangeRate();
});
function getExchangeRate() {
  const amount = document.querySelector(".amount input");
  let amountval = amount.value;
  if (amountval == "" || amountval === "0") {
    amount.value = "1";
    amountval = 1;
  }
  exchangeRatetxt.innerText = "Getting Exchange Rate.... ";
  let url = `https://v6.exchangerate-api.com/v6/cd55223410af0d5e44a069f2/latest/${fromCurrency.value}`;
  fetch(url).then(response => response.json()).then(result=>{
    let exchangeRate = result.conversion_rates[toCurrency.value];
    // console.log(exchangeRate);
    // console.log(result);
    let totalExchagerate=(amountval*exchangeRate).toFixed(2)
    console.log(totalExchagerate);
   
    exchangeRatetxt.innerText = `${amountval} ${fromCurrency.value} = ${totalExchagerate} ${toCurrency.value}`;
  })
}
