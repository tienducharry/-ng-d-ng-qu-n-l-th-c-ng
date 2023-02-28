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

//elements
const breedInput = document.getElementById("input-breed");
const tbodyEl = document.getElementById("tbody");

const findBtn = document.getElementById('find-btn');
//get item
let petArr = getFromStorage("pet-list") || [];
console.log(petArr);

//lay du lieu breed
const arrBreed = getFromStorage('breed-list') || [];
//tao array breed tuong ung;
// const dogBreed = arrBreed.filter(breed => breed = breed.type === 'Dog');
// const catBreed = arrBreed.filter(breed => breed = breed.type === 'Cat');
//render breed
function renderBreed(a) {   
  breedInput.innerHTML='<option>Select Breed</option>';
        for (let i5= 0; i5 < a.length; i5++) {
            const opt = document.createElement('option');
            opt.innerHTML=`
            <option>${a[i5].breed}</option>
            `;
            breedInput.appendChild(opt);
        }
    };
// goi ham hien thi danh sach breed
renderBreed(arrBreed);

//
function renderTableData(petArr) {
  tbodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    const checkV = petArr[i].vaccinated
      ? "bi-check-circle-fill"
      : "bi-x-circle-fill";
    const checkD = petArr[i].dewormed
      ? "bi-check-circle-fill"
      : "bi-x-circle-fill";
    const checkS = petArr[i].sterilized
      ? "bi-check-circle-fill"
      : "bi-x-circle-fill";
    row.innerHTML = `
    <tr>
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight}</td>
    <td>${petArr[i].petlength}</td>
    <td>${petArr[i].breed}</td>
    <td>
        <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${checkV}"></i></td>
    <td><i class="bi ${checkD}"></i></td>
    <td><i class="bi ${checkS}"></i></td>
    <td>${petArr[i].dateTime}</td>
    </tr>`;
    tbodyEl.appendChild(row);
  }
};


findBtn.addEventListener('click', function() {
  let data = [];
const idValue = document.getElementById("input-id").value;
const nameValue = document.getElementById("input-name").value;
const typeValue = document.getElementById("input-type").value;
const breedValue = document.getElementById("input-breed").value;
const vaccinatedValue = document.getElementById("input-vaccinated").checked;
const dewormedValue = document.getElementById("input-dewormed").checked;
const sterilizedValue = document.getElementById("input-sterilized").checked;

  if(idValue){
    data = petArr.filter(e => e.id.includes(idValue)); //tim theo id
    console.log(data);
  }
  if(nameValue) {
    data = petArr.filter(e => e.name.includes(nameValue)); // tim theo name
  }
  if (typeValue != 'Select Type') {
    data = petArr.filter(e => e.type.includes(typeValue)); // tim theo type
  }
  if (breedValue != 'Select Breed') {
    data = petArr.filter(e => e.breed.includes(breedValue)); // tim theo breed
  }
  if (vaccinatedValue) {
    data = petArr.filter(e => e.vaccinated); // tim theo vaccine
  }
  if (dewormedValue) {
    data = petArr.filter(e => e.dewormed); // tim theo deworm
  }
  if (sterilizedValue) {
    data = petArr.filter(e => e.sterilized); // tim theo ster
  }
  if (!idValue && !nameValue && typeValue == 'Select Type' && breedValue == 'Select Breed' && vaccinatedValue === false && dewormedValue === false && sterilizedValue === false) {
    data = petArr;
  }
  renderTableData(data);
  console.log(data);
})
