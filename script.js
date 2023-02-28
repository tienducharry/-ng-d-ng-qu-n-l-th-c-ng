"use strict";
// Get current date
const currentDate = new Date();
const currentDay =
  currentDate.getDate() +
  "/" +
  (currentDate.getMonth() + 1) +
  "/" +
  currentDate.getFullYear();

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

// sideBar.addEventListener('mouseover', function () {
//     sideBar.classList.remove('active')});
// sideBar.addEventListener('mouseout',  function() {
//         sideBar.classList.remove('active')});
// sideBar.addEventListener('mouseout',function() {
//     sideBar.classList.remove('active')});

//elements
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tbodyEl = document.getElementById("tbody");

//buttons
const submitBtn = document.getElementById("submit-btn");
const showBtn = document.getElementById("healthy-btn");
const caclBtn = document.getElementById("calc-btn");
//get item
let petArr = getFromStorage("pet-list") || [];
//ham luu tru du lieu
const storePet = (x) => saveToStorage("pet-list", x);
//update id array
let petID = [];
petArr.forEach(function(a){
    petID.push(a.id)
    return petID;
});
console.log(petID);
    


let req = true;
let flag = false;
let healthyCheck = false;
const petsWeight = [];
const petsLenght = [];

//tao bang cho moi du lieu moi nhap vao
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
    <td>${currentDay}</td>
    <td><button type="button" class="btn btn-danger ${petArr[i].id}" onclick="deletePet('${petArr[i].id}')">Delete</button>
    </td>
    </tr>`;
    tbodyEl.appendChild(row);
  }
};

//load item

renderTableData(petArr);
console.log(petArr);

//lay du lieu breed
const arrBreed = getFromStorage('breed-list') || [];
//tao array breed tuong ung;
const dogBreed = arrBreed.filter(breed => breed = breed.type === 'Dog');
const catBreed = arrBreed.filter(breed => breed = breed.type === 'Cat');
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
// hien thi danh sach breed tuong ung

typeInput.addEventListener('change', function(){
if (typeInput.value === 'Select Type') {
    alert('Please input type');
    breedInput.innerHTML='<option>Select Breed</option>';
} else if (typeInput.value === 'Dog') { 
    renderBreed(dogBreed);
   
} else if (typeInput.value === 'Cat'){
    renderBreed(catBreed);
       
}});

//submit
submitBtn.addEventListener("click", function () {
  const petData = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    petlength: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    dateTime: currentDay,
  };

  //Tong hop dieu kien input
  if (parseInt(ageInput.value) < 1 || parseInt(ageInput.value) > 15) {
    alert("Age must be between 1 and 15!");
  } else if (
    parseInt(weightInput.value) < 1 ||
    parseInt(weightInput.value) > 15
  ) {
    alert("Weight must be between 1 and 15!");
  } else if (
    parseInt(lengthInput.value) < 1 ||
    parseInt(lengthInput.value) > 100
  ) {
    alert("Length must be between 1 and 100!");
  } else if (typeInput.value == "Select Type") {
    alert("Please select Type!");
  } else if (breedInput.value == "Select Breed") {
    alert("Please select Breed!");
  } else if (!idInput.value) {
    alert("Please enter an ID!");
  } else if (!nameInput.value) {
    alert("Please enter pet name!");
  } else if (!ageInput.value) {
    alert("Please enter pet age!");
  } else if (!weightInput.value) {
    alert("Please enter pet weight!");
  } else if (!lengthInput.value) {
    alert("Please enter pet lenght!");
  } else if (petID.includes(idInput.value)) {
    alert("ID must unique!");
  } else {
    petID.push(idInput.value);
    petArr.push(petData);
    renderTableData(petArr);
    petsWeight.push(parseInt(weightInput.value));
    petsLenght.push(parseInt(lengthInput.value));
    storePet(petArr); //save to storage
  }
  //Clear form
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;

  
});

//xoa du lieu tuong ung voi nut Delete
function deletePet(id) {
  let choice = confirm("Are you sure?");
  if (choice) {
    for (let i0 = 0; i0 < petArr.length; i0++) {
      if (id == petArr[i0].id) {
        petArr.splice(i0, 1);
      }
    }
  }
  renderTableData(petArr); // goi lai ham rendertable voi array sau khi xoa
  storePet(petArr); //updage storage
}
//Show healthy/all pet
showBtn.addEventListener("click", function () {
  const tr = document.querySelectorAll("tr");
  if (healthyCheck == false) {
    showBtn.textContent = "Show All Pet";
    for (let i1 = 0; i1 < petArr.length; i1++) {
      if (
        petArr[i1].vaccinated != true ||
        petArr[i1].dewormed != true ||
        petArr[i1].sterilized != true
      ) {
        tr[i1 + 1].classList.add("hidden");
      }
    } //an ket qua k dat
    healthyCheck = true;
  } else {
    showBtn.textContent = "Show Healthy Pet";
    for (let i2 = 0; i2 < petArr.length; i2++) {
      tr[i2 + 1].classList.remove("hidden"); //hien toan bo
    }
    healthyCheck = false;
  }
});
//Calculate BMI
// caclBtn.addEventListener("click", function () {
//   let petBMI = 0;
//   const pb = document.querySelectorAll(".bmi");
//   function caclBMI(weight, length) {
//     for (let i3 = 0; i3 < petArr.length; i3++) {
//       petBMI =
//         petArr[i3].type === "Cat"
//           ? (weight * 886) / length ** 2
//           : (weight * 703) / length ** 2;
//     }
//   }
//   for (let i4 = 0; i4 < petArr.length; i4++) {
//     caclBMI(petsWeight[i4], petsLenght[i4]);
//     pb[i4].textContent = petBMI.toFixed(2);
//   }
// });

