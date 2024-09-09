const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/";

let dropdowns = document.querySelectorAll(".select select");
let btn = document.querySelector(".btn");
let from = document.querySelector(".from .select select");
let to = document.querySelector(".to .select select");

let msg = document.querySelector(".msg");

for(let select of dropdowns)
{
    for(code in countryList)
        {
            let newOption = document.createElement("option");
            newOption.value=code;
            newOption.innerText=code;
            
            if(select.name==="From" && code==="USD"){
                newOption.selected="selected";
            }
            else if(select.name==="To" && code==="INR"){
                newOption.selected="selected";
            }
            select.append(newOption);
        }
        select.addEventListener("change",(evt)=>{
            getNewFlag(evt.target)
        })
}

function getNewFlag(element){
    let src = `https://flagsapi.com/${countryList[element.value]}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src= src;
}

async function updateRate(){
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    let fromCurr = from.value;
    let toCurr = to.value;

    if(amtVal<1 || amtVal==""){
        amtVal=1;
        amount.value=1;
    }

    let url = `${baseURL}${fromCurr.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    console.log(rate);

    let finalAmt = amtVal*rate;

    msg.innerText = `${amtVal} ${fromCurr} = ${finalAmt} ${toCurr}`;
}

btn.addEventListener("click",  (evt)=>{
    evt.preventDefault();
    updateRate();
});

window.addEventListener("load",()=>{
    updateRate();
})