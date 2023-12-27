const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const dropdowns=document.querySelectorAll(".dropdown select");
// for(let selects in dropdowns){
// for ( currcode in countrylist){
//     let newoption=document.createElement("option");
//     newoption.innerText=currcode;
//     newoption.value=currcode;
//     selects.appendChild(newoption);
// }
// }
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
dropdowns.forEach(select => {
    for (const currcode in countrylist) {
        if (countrylist.hasOwnProperty(currcode)) {
            let newOption = document.createElement("option");
            newOption.innerText = currcode;
            newOption.value = currcode;
            
             if(select.name==="from" && currcode==="USD"){
                newOption.selected="selected";
             }
             else if(select.name==="to" && currcode==="INR"){
                newOption.selected="selected";
             }

             select.appendChild(newOption);
        }
        select.addEventListener("change", (evt)=>{
            updateflag(evt.target);
        })
    }
});

const updateflag=(element)=>{
 let ccode=element.value;
 let countrycode=countrylist[ccode];
 let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
 let img=element.parentElement.querySelector("img");
 img.src=newsrc
};

btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
   
    updateexchange();
   
})

const updateexchange =async ()=>{
    let amount=document.querySelector(".amount input");
    let amtvalue=amount.value;
    if(amtvalue==="" || amtvalue<1){
        amtvalue=1;
        amount.value="1";
    }

    const url=`${baseurl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;

    let respons=await fetch(url);
    // console.log(respons);
    let data= await respons.json();
    let rate=data[tocurr.value.toLowerCase()]
    console.log(rate);
    let finalamt=amtvalue*rate;
    msg.innerText=`${amtvalue} ${fromcurr.value} = ${finalamt} ${tocurr.value}`
    
}

window.document.addEventListener("load",()=>{

})