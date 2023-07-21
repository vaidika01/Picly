const btn = document.getElementById("getPhoto")
const Message = document.getElementById("error")
const galElement = document.getElementById("divimg")
const containerE = document.getElementById("container")
const divleftE = document.getElementById("divleft")
const widthSize = window.matchMedia("(min-width: 780px)")

function widthChange(widthSize) {
    if (widthSize.matches) { 
     containerE.style.flexDirection = "row";
     containerE.style.justifyContent = "space-around";
     divleftE.style.flex = "30%";
     galElement.style.flex = "70%";
    }
    else{
     containerE.style.flexDirection = "column";
     galElement.style.overflowY = "scroll";  
    }
}
widthSize.addEventListener("change", widthChange);
widthChange(widthSize);

async function loadImage(){
    const Value = document.getElementById("photoNumber").value;
    
              
    if( Value<1 || Value>20 ){
        Message.style.display = "block";
        Message.textContent = "Number should be between 0 and 21"
        return
    }

    imgs = "";
    btn.style.display = "none";
    await fetch( `https://api.unsplash.com/photos?per_page=${Value}&page=${Math.round(Math.random() * 1000
    )}&client_id=238b4f660e017edb7dadc5ce864869daf68441fd58249d0f773123334f11ef9f`
    ).then((res)=>
    res.json().then((data)=>{
        if(data){
            data.forEach((pic)=>{
              
              imgs += ` <img src=${pic.urls.small} alt="image"/>`;
              galElement.style.display = "block";
              galElement.innerHTML = imgs;
              btn.style.display = "block";
            })
        } 
    }))
   
    Message.style.display = "none";
}

btn.addEventListener("click", loadImage)

            

