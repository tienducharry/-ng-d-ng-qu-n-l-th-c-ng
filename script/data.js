'use strict';

//them animation cho sidebar
const sideBar = document.getElementById("sidebar");
const listUnstyle = document.querySelector(".list-unstyled");
const content = document.querySelector("#content");
const wrap = document.querySelector(".wrapper");

sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") sideBar.classList.add("active");
});
content.addEventListener("click", function () {
  sideBar.classList.add("active");
});

//get item from storage
let petArr = getFromStorage("pet-list") || [];
//elements
const exportBtn = document.getElementById('export-btn');
const importBtn = document.getElementById('import-btn');

//ham export
function saveToFile() {
    const dataRe = JSON.stringify(petArr)
    const blob = new Blob([dataRe], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "Text.txt");
};

//bat su kien export
exportBtn.addEventListener('click', saveToFile);

//ham import
let mydata; 
function importFile(){
    const myInput = document.querySelector('input[type="file');
    if(myInput.value){
        const fileReader = new FileReader();
        fileReader.onload = function(){
            const stringData = fileReader.result;
            console.log(stringData);;
            mydata = JSON.parse(stringData);
            console.log(mydata);
            saveToStorage('pet-list', mydata);
            console.log(getFromStorage("pet-list"));
        }
    fileReader.readAsText(myInput.files[0], 'UTF-8');
    }
    else {
        alert('Invalid file!');
    }
};
//bat su kien import
importBtn.addEventListener('click', importFile);
