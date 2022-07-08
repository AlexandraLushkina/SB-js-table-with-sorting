export function getFio(student) {
  return `${student.surname} ${student.name} ${student.middleName}`;
}
export function getAgeString(birthdate) {
  const currentDate = new Date();
  const birthDate = new Date(birthdate);
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth() + 1;
  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  age = age.toString();
  const ageLastDigit = Number(age[age.length - 1]);
  switch (ageLastDigit) {
    case 1:
      return `${age} год`;
    case 2:
    case 3:
    case 4:
      return `${age} года`;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
    default:
      return `${age} лет`;
  }
}
export function getEndCourseYear(startYear) {
  return Number(startYear) + 4;
}
export function getCourseNumber(startYear) {
  const endYear = getEndCourseYear(startYear);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  if ((currentYear >= endYear && currentMonth >= 7) || currentYear > endYear) {
    return "закончил";
  }
  return `${currentYear - startYear + 1} курс`;
}
export function addSortIcons() {
  const iconFio = document.getElementById("iconFio");
  const iconFaculty = document.getElementById("iconFaculty");
  const iconBirthdate = document.getElementById("iconBirthdate");
  const iconYearsEducation = document.getElementById("iconYearsEducation");

  const fioSvg = document.createElement("object");
  fioSvg.setAttribute("class", "icon");
  fioSvg.setAttribute("type", "image/svg+xml");
  fioSvg.setAttribute("data", "./img/sort-black.svg");
  fioSvg.style.height = "19px";
  iconFio.style.alignContent = "center";

  iconFio.append(fioSvg.cloneNode());
  iconFaculty.append(fioSvg.cloneNode());
  iconBirthdate.append(fioSvg.cloneNode());
  iconYearsEducation.append(fioSvg.cloneNode());
}
export function sortByFIO(students) {
  students.sort((st1, st2) => {
    if (getFio(st1) > getFio(st2)) {
      return 1;
    }
    if (getFio(st1) < getFio(st2)) {
      return -1;
    }
    return 0;
  });
}
export function makeSorting(array, compareStr) {
  array.sort((a, b) => {
    if (a[compareStr] > b[compareStr]) {
      return 1;
    }
    if (a[compareStr] < b[compareStr]) {
      return -1;
    }
    return 0;
  });
}

export function makeFilteredList(students) {
  const searchFio = document.getElementById("filterFio").value;
  const searchFaculty = document.getElementById("filterFaculty").value;
  const searchStartYear = document.getElementById("filterStartYear").value;
  const searchEndYear = document.getElementById("filterEndYear").value;
  if (!searchFio && !searchFaculty && !searchStartYear && !searchEndYear) {
    return students;
  }
  let filtered = students;
  if (searchFio) {
    filtered = filtered.filter(
      (student) =>
        student.name.includes(searchFio) ||
        student.surname.includes(searchFio) ||
        student.middleName.includes(searchFio)
    );
  }
  if (searchFaculty) {
    filtered = filtered.filter((student) =>
      student.faculty.includes(searchFaculty)
    );
  }
  if (searchStartYear) {
    filtered = filtered.filter((student) =>
      student.startYear.toString().includes(searchStartYear)
    );
  }
  if (searchEndYear) {
    filtered = filtered.filter((student) => {
      const endYear = parseInt(student.startYear) + 4;
      return endYear.toString().includes(searchEndYear);
    });
  }
  return filtered;
}
