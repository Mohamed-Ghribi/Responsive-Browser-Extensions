const lightMode = document.querySelector(".lightMode")
const main = document.querySelector("main")
const topBar = document.querySelector(".topBar")
const extensionContainer = document.querySelector(".extensions")
const etat = document.querySelectorAll(".etat")
const Active = document.querySelector(".Active")
const Inactive = document.querySelector(".Inactive")
const contentHeader = document.querySelector(".contentHeader")
const logo = document.querySelector(".logo")

// ****************************Light Mode or theme 
function applyModeLight(mode){
      const img =lightMode.querySelector("img");
    const items = document.querySelectorAll(".item")
    const removeBtns = document.querySelectorAll(".removeBtn")
    if(mode === "sun"){
        main.style.background = "linear-gradient(180deg, #EBF2FC 0%, #EEF8F9 100%)";
    topBar.style.backgroundColor = "hsl(200, 60%, 99%)"
    lightMode.style.backgroundColor ="hsl(0, 0%, 78%)"
    img.setAttribute("src","assets/images/icon-moon.svg")
    items.forEach(element=>{
        const h3 = element.querySelector("h3");
        element.style.backgroundColor = "hsl(200, 60%, 99%)";
        element.style.border = "1px solid #091540"
        h3.style.color ="#091540";
    })
    contentHeader.style.color = "#091540"
    etat.forEach(element=>{
        if(!element.classList.contains("active")){
             element.style.backgroundColor = "hsl(200, 60%, 99%)"
             element.style.border = "1px solid hsl(225, 23%, 24%)"
             element.style.color = "#091540"
        }else{
            element.style.backgroundColor ="hsl(3, 77%, 44%)"
            element.style.border = "1px solid hsl(3, 77%, 44%)"
            element.style.color = "#091540"
        }
    })
    removeBtns.forEach(element=>{
        element.style.backgroundColor ="hsl(200, 60%, 99%)"
        element.style.color = "#091540";
        element.style.border = "1px solid hsl(226, 11%, 37%)"
    })
    logo.classList.remove('bright')
    localStorage.setItem("lightMode","sun")
    }else if(mode === "moon"){
       main.style.background = "linear-gradient(180deg, #040918 0%, #091540 100%)";
    topBar.style.backgroundColor = "hsl(226, 25%, 17%)"
    lightMode.style.backgroundColor ="hsl(225, 23%, 24%)"
    img.setAttribute("src","assets/images/icon-sun.svg")
    items.forEach(element=>{
        const h3 = element.querySelector("h3");
        element.style.backgroundColor = "hsl(225, 23%, 24%)";
        element.style.border = "1px solid hsl(200, 60%, 99%)"
        h3.style.color ="hsl(200, 60%, 99%)";
    })
    contentHeader.style.color = "hsl(200, 60%, 99%)"
    etat.forEach(element=>{
        if(!element.classList.contains("active")){
           element.style.backgroundColor = "hsl(225, 23%, 24%)"
           element.style.border = "1px solid hsl(200, 60%, 99%)"
           element.style.color = "hsl(200, 60%, 99%)"
        }else{
            element.style.backgroundColor ="hsl(3, 77%, 44%)"
            element.style.border = "1px solid hsl(3, 77%, 44%)"
            element.style.color = "#091540"
        }
        
    })
    removeBtns.forEach(element=>{
        element.style.backgroundColor ="hsl(225, 23%, 24%)"
        element.style.color = "hsl(200, 60%, 99%)";
        element.style.border = "1px solid hsl(200, 60%, 99%)"
    })
    logo.classList.add('bright')
    localStorage.setItem("lightMode","moon")
    }
}

etat.forEach(element=>{
   element.addEventListener("click",function(){
      etat.forEach(ele =>{
        if(ele.classList.contains("active")){
            ele.classList.remove("active")
        }
      })
      element.classList.add("active")
      loadData(element.innerHTML)
      
   })
})

window.addEventListener("load",()=>{
    const theme = localStorage.getItem("lightMode")
    applyModeLight(theme)
})

lightMode.addEventListener('click',function(e){
    const source = e.target.closest("img").getAttribute("src")
    let theme = "";
    if(source.includes("moon") ){
        theme = "moon"
    }else{
        theme = "sun"
    }
    applyModeLight(theme)
})
// ******************************Loading Data

async function loadData(status) {
    try{
        const response = await fetch("/data.json")
        if(!response.ok) throw new Error("Erreur de chargement de fichier JSON")
        const data = await response.json();
        const container = document.createElement("div")
       data.forEach(element => {
    if (
        status === "All" ||
        (status === "Active" && element.isActive === true) ||
        (status === "Inactive" && element.isActive === false)
    ) {
        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
            <div class="extension-info">
                <img src="${element.logo}" alt="">
                <div class="details">
                    <h3 class="itemName">${element.name}</h3>
                    <p class="description">${element.description}</p>
                </div>
            </div>
            <div class="buttons">
                <button class="removeBtn">Remove</button>
                <label class="switch">
                    <input type="checkbox" ${element.isActive? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
        `;
        container.appendChild(item)
    }
    extensionContainer.innerHTML = container.innerHTML
});

    }catch(error){
        console.log(error)
    }
    const currentTheme = localStorage.getItem("lightMode");
    applyModeLight(currentTheme);
    
}
loadData("All")


document.addEventListener("click",function(e){
    if(e.target.classList.contains("removeBtn")){
        const item = e.target.closest(".item")
        item.remove()
    }
})

logo.addEventListener("click",function(){
    window.location.reload(true)
})