import {
  sortByFIO,
  makeSorting,
  getFio,
  getAgeString,
  getEndCourseYear,
  getCourseNumber,
  makeFilteredList,
} from "./utils.js";

export function addSorting(element, type, students) {
  element.style.cursor = "pointer";
  element.addEventListener("click", () => {
    switch (type) {
      case "fio":
        sortByFIO(students);
        break;
      case "faculty":
        makeSorting(students, "faculty");
        break;
      case "birthDate":
        makeSorting(students, "dateOfBirth");
        break;
      case "educationDate":
        makeSorting(students, "startYear");
        break;
    }
    renderTable(students);
  });
}

export function addSorts(students) {
  addSorting(document.getElementById("fio"), "fio", students);
  addSorting(document.getElementById("faculty"), "faculty", students);
  addSorting(document.getElementById("birthdateAndAge"), "birthDate", students);
  addSorting(
    document.getElementById("yearsOfEducation"),
    "educationDate",
    students
  );
}

export function renderFilters(students) {
  const fioFilter = document.getElementById("filterFio");
  const filterFaculty = document.getElementById("filterFaculty");
  const filterStartYear = document.getElementById("filterStartYear");
  const filterEndYear = document.getElementById("filterEndYear");
  fioFilter.addEventListener("change", () => {
    const filtered = makeFilteredList(students);
    renderTable(filtered);
  });
  filterFaculty.addEventListener("change", () => {
    const filtered = makeFilteredList(students);
    renderTable(filtered);
  });
  filterStartYear.addEventListener("change", () => {
    const filtered = makeFilteredList(students);
    renderTable(filtered);
  });
  filterEndYear.addEventListener("change", () => {
    const filtered = makeFilteredList(students);
    renderTable(filtered);
  });
}

export function renderForm(students) {
  const name = document.getElementById("addName");
  const middleName = document.getElementById("addMiddleName");
  const surname = document.getElementById("addSurname");
  const dateOfBirth = document.getElementById("addDateOfBirth");
  const startYear = document.getElementById("addStartYear");
  const faculty = document.getElementById("addFaculty");

  startYear.max = new Date().getFullYear();
  dateOfBirth.max = new Date().toISOString().split("T")[0];

  const forms = document.querySelectorAll(".needs-validation");
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          form.classList.add("was-validated");
          students.push({
            name: name.value,
            surname: surname.value,
            middleName: middleName.value,
            dateOfBirth: new Date(dateOfBirth.value),
            startYear: parseInt(startYear.value),
            faculty: faculty.value,
          });
          name.value = null;
          surname.value = null;
          middleName.value = null;
          dateOfBirth.value = null;
          startYear.value = null;
          faculty.value = null;
          renderTable(students);
        }
        event.preventDefault();
      },
      false
    );
    return students;
  });
}

export function renderTable(students) {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  students.forEach((student) => {
    const rowElement = document.createElement("tr");

    const fioElement = document.createElement("td");
    const facultyElement = document.createElement("td");
    const birthdateAndAgeElement = document.createElement("td");
    const yearsOfEducationElement = document.createElement("td");

    fioElement.innerText = getFio(student);
    facultyElement.innerText = student.faculty;

    const dateOfBirth = student.dateOfBirth;
    const birthDate = dateOfBirth.getDate();
    let birthMonth = dateOfBirth.getMonth() + 1;
    if (birthMonth < 10) {
      birthMonth = `0${birthMonth}`;
    }
    const birthYear = dateOfBirth.getFullYear();
    const age = getAgeString(dateOfBirth);
    birthdateAndAgeElement.innerText = `${birthDate}.${birthMonth}.${birthYear} (${age})`;

    const startYear = student.startYear;
    const endYear = getEndCourseYear(startYear);
    const courseNumber = getCourseNumber(startYear);
    yearsOfEducationElement.innerText = `${startYear}-${endYear} (${courseNumber})`;

    rowElement.append(fioElement);
    rowElement.append(facultyElement);
    rowElement.append(birthdateAndAgeElement);
    rowElement.append(yearsOfEducationElement);

    tbody.append(rowElement);
  });
}
