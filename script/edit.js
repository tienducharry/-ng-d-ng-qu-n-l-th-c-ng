"use strict";

// Dat bien
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
const submitBtn = document.getElementById("submit-btn");
const containerForm = document.getElementById("container-form");
const tBody = document.getElementById("tbody");
const storePet = (x) => saveToStorage("pet-list", x);
const petList = getFromStorage("pet-list") || [];

// Bo sung animation cho sidebar
const sideBar = document.getElementById("sidebar");
const listUnstyle = document.querySelector(".list-unstyled");
const content = document.querySelector("#content");

sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") sideBar.classList.add("active");
});
content.addEventListener("click", function () {
  sideBar.classList.add("active");
});

// Tao ham kiem tra du lieu hop le
const validate = function () {
    // Khong co truong nao bi nhap thieu du lieu
    if (!nameInput.value) return false;
    if (!ageInput.value) return false;
    if (!weightInput.value) return false;
    if (!lengthInput.value) return false;
    if (!colorInput.value) return false;
    if (typeInput.value === "Select Type" || typeInput.value === "")
        return false;
    if (breedInput.value === "Select Breed" || breedInput.value === "")
        return false;
    if (ageInput.value < 1 || ageInput.value > 15) return false; // 1 <= age <= 15
    if (weightInput.value < 1 || weightInput.value > 15) return false; // 1 <= weight <= 15
    if (lengthInput.value < 1 || lengthInput.value > 100) return false; // 1 <= length <= 100
    return true;
};
const petBreed = getFromStorage("breed-list") || [];
// Ham hien thi breed
const renderBreed = function (petBreed) {
    breedInput.innerHTML = `<option>Select Breed</option>`;
    for (let i = 0; i < petBreed.length; i++) {
        const option = document.createElement("option");
        option.innerHTML = `<option>${petBreed[i].breed}</option>`;
        breedInput.appendChild(option);
    }
};
// Loc breed theo loai ma nguoi dung dang chon
typeInput.addEventListener("change", function () {
    const optionsValue = petBreed.filter(function (item) {
        if (typeInput.value === "Dog") return item.type === "Dog";
        if (typeInput.value === "Cat") return item.type === "Cat";
        if (typeInput.value === "Select type") return [];
    });
    renderBreed(optionsValue);
});
// Ham hien thi du lieu
const renderTableData = function (petArr) {
    tBody.innerHTML = "";
    for (let i = 0; i < petArr.length; i++) {
        const checkV = petArr[i].vaccinated
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        const checkD = petArr[i].dewormed
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        const checkS = petArr[i].sterilized
            ? "bi bi-check-circle-fill"
            : "bi bi-x-circle-fill";
        const row = document.createElement("tr");
        row.innerHTML = `<th scope="row">${petArr[i].id}</th>
<td>${petArr[i].name}</td>
<td>${petArr[i].age}</td>
<td>${petArr[i].type}</td>
<td>${petArr[i].weight} kg</td>
<td>${petArr[i].petlength} cm</td>
<td>${petArr[i].breed}</td>
<td>
<i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
</td>
<td><i class="${checkV}"></i></td>
<td><i class="${checkD}"></i></td>
<td><i class="${checkS}"></i></td>
<td>${petArr[i].dateTime}</td>
<td>
<td>
    <button type="button" class="btn btn-warning">
    Edit
    </button>
</td>`;
        tBody.appendChild(row);
    }
    const btnsEdit = document.querySelectorAll(".btn-warning");
    btnsEdit.forEach(function (btn, i) {
        btn.addEventListener("click", function () {
            containerForm.classList.remove("hide");
            idInput.value = petList[i].id;
            nameInput.value = petList[i].name;
            ageInput.value = petList[i].age;
            typeInput.value = petList[i].type;
            const optionsValue = petBreed.filter(function (item) {
                if (typeInput.value === "Dog") return item.type === "Dog";
                if (typeInput.value === "Cat") return item.type === "Cat";
                if (typeInput.value === "Select type") return [];
            });
            renderBreed(optionsValue);
            weightInput.value = petList[i].weight;
            lengthInput.value = petList[i].petlength;
            breedInput.value = petList[i].breed;
            vaccinatedInput.checked = petList[i].vaccinated;
            dewormedInput.checked = petList[i].dewormed;
            sterilizedInput.checked = petList[i].sterilized;
            // Bat su kien "click" vao nut "Submit"
            // Lay duoc du lieu tu input form
            
            submitBtn.addEventListener("click", function () {
                const data = {
                    id: idInput.value,
                    name: nameInput.value,
                    age: parseInt(ageInput.value),
                    type: typeInput.value,
                    weight: parseInt(weightInput.value),
                    length: parseInt(lengthInput.value),
                    color: colorInput.value,
                    breed: breedInput.value,
                    vaccinated: vaccinatedInput.checked,
                    dewormed: dewormedInput.checked,
                    sterilized: sterilizedInput.checked,
                    date: petArr[i].dateTime,
                };
                // Kiem tra du lieu da hop le chua
                // Thong bao den nguoi dung neu du lieu khong hop le
                // Khong co truong nao bi nhap thieu du lieu
                if (!nameInput.value) alert("Please input name");
                if (!ageInput.value) alert("Please input age");
                if (typeInput.value === "Select Type" || typeInput.value === "")
                    alert("Please select type");
                if (
                    breedInput.value === "Select Breed" ||
                    breedInput.value === ""
                )
                    alert("Please select breed");
                if (!weightInput.value) alert("Please input weigth");
                if (!lengthInput.value) alert("Please input length");
                if (!colorInput.value) alert("Please input color");

                if (ageInput.value < 1 || ageInput.value > 15)
                    alert("Age must be between 1 and 15!"); // 1 <= age <= 15
                if (weightInput.value < 1 || weightInput.value > 15)
                    alert("Weight must be between 1 and 15!"); // 1 <= weight <= 15
                if (lengthInput.value < 1 || lengthInput.value > 100)
                    alert("Length must be between 1 and 100!"); // 1 <= length <= 100
                // Kiem tra du lieu hop le bang cach goi ham validate
                validate();
                // Neu du lieu hop le thi thay the du lieu trong mang va hien thi du lieu ra giao dien nguoi dung
                if (validate()) {
                    // Thay the du lieu trong mang
                    petList[i] = data;
                    console.log(petList);
                    // Hien thi du lieu
                    renderTableData(petList);
                    storePet(petList);
                }
            });
        });
    });
};
renderTableData(petList);
