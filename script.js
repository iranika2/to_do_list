const inputbox = document.getElementById("input-box");
const containerlist = document.getElementById("container-list");

// filtering special character

function sanitize(string) {
    const map = {
        '&': '',
        '<': '',
        '>': '',
        '"': '',
        "'": '',
        "/": '',
        "(": '',
        ")": ''
    };
    const reg = /[&<>"'/()]/ig;
    return string.replace(reg, (match)=>(map[match]));
  }

// اضافه کردن المنت به لیست

function addtask(){
    if(inputbox.value === ''){
        alert("باید چیزی داخل کادر بنویسی");
    }
    else{
         let li = document.createElement("li");
         li.innerHTML = sanitize(inputbox.value);
         containerlist.appendChild(li);
         let span = document.createElement("span");
         span.innerHTML = "\u00d7";
         li.appendChild(span);
    }


    inputbox.value = "";
    savedata();
}

//اضافه شدن المنت با استفاده از اینتر

inputbox.addEventListener("keypress", function(event){
    if(event.key === "Enter"){
        addtask();
}
});

// پاک کردن و خط زن لیست

containerlist.addEventListener("click" , function(test){
    if(test.target.tagName === "LI"){
        test.target.classList.toggle("checked");
        savedata();
    }
    else if(test.target.tagName === "SPAN"){
        test.target.parentElement.remove();
        savedata();
    }
}, false);

// دخیره کردن حافظه

function savedata(){
    localStorage.setItem("data", containerlist.innerHTML)
}
function showTask(){
    containerlist.innerHTML = localStorage.getItem("data")
}
showTask();