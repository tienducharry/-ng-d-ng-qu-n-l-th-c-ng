'use strict';
//load item
const breedArr = getFromStorage('breed-list') || [];

const submitBtn = document.getElementById('submit-btn');
const tbody = document.getElementById('tbody');
const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');
const storeBreed = (x) => saveToStorage('breed-list', x);

const sideBar = document.getElementById("sidebar");
const listUnstyle = document.querySelector(".list-unstyled");
const content = document.querySelector("#content");

//them animation cho sidebar
sideBar.addEventListener("click", function () {
    sideBar.classList.toggle("active");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") sideBar.classList.add("active");
  });
  content.addEventListener("click", function () {
    sideBar.classList.add("active");
  });

console.log(breedArr);
//ham tao bang
function renderTable(breedArr) {
    tbody.innerHTML='';
    for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr')
    row.innerHTML=`
    <tr>
    <th scope="row">${i+1}</th>
    <td>${breedArr[i].breed}</td>
    <td>${breedArr[i].type}</td>
    <td><button type="button" class="btn btn-danger" onclick="deleteBreed('${i}')">Delete</button>
    </td>
    </tr>`;
    tbody.appendChild(row);}
};

let req = true;
renderTable(breedArr);
//ham kiem tra du lieu
const validate = function () {
    if (inputType.value === "Select Type")
        {return false;}
    if (inputBreed.value === "") 
        {return false;}
    return true;
    };
const valid = function () {
    breedArr.forEach(function(el){
        if (inputBreed.value === el.breed)
        req = false;
    });
}
//bat su kien nut submit
submitBtn.addEventListener('click', function(){
    const breedData = {
        breed: inputBreed.value,
        type: inputType.value,
    };
    //goi ham de kiem tra
    validate();
    valid();
    // Thong bao den nguoi dung neu du lieu khong hop le
    if (inputType.value === "Select Type" || inputType.value === "")
        alert("Please select type");
    if (inputBreed.value === "Select Breed" || inputBreed.value === "")
        alert("Please input breed");
    if (req === false) {
        alert('Breed already exist!')
    };
    
    //hien thi & update du lieu neu hop le
    if (validate && req === true) {
        breedArr.push(breedData);
        renderTable(breedArr);
    //save item
    storeBreed(breedArr); 
    
};
// 5. Xoa cac du lieu vua nhap tren form
inputType.value = "Select Type";
inputBreed.value = ""; 
})
//ham xoa thong tin
function deleteBreed(id) {
    let choice = confirm('Are you sure?');
                breedArr.splice(id,1);
                storeBreed(breedArr); 
                renderTable(breedArr);// goi lai ham rendertable voi array sau khi xoa
    };
