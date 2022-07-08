import { renderTable, addSorts, renderFilters, renderForm } from "./render.js";
import { addSortIcons } from "./utils.js";

export default class Main {
  constructor() {
    this.students = [
      {
        name: "Ааааааа",
        surname: "Ааааа",
        middleName: "Ааааа",
        dateOfBirth: new Date(1996, 5, 27),
        startYear: 2014,
        faculty: "some",
      },
      {
        name: "Ггггггг",
        surname: "Ддддддддд",
        middleName: "Гггггггг",
        dateOfBirth: new Date(1990, 5, 20),
        startYear: 2021,
        faculty: "some",
      },
      {
        name: "Гггггг",
        surname: "Тттттттттт",
        middleName: "Гггггггг",
        dateOfBirth: new Date(2001, 11, 12),
        startYear: 2020,
        faculty: "erlkgerkg",
      },
      {
        name: "Гггггг",
        surname: "Ггггггг",
        middleName: "Ггггггг",
        dateOfBirth: new Date(2001, 4, 45),
        startYear: 2018,
        faculty: "erlglermg",
      },
      {
        name: "Ббббббб",
        surname: "Ааааааа",
        middleName: "Ввввввввв",
        dateOfBirth: new Date(1999, 4, 2),
        startYear: 2014,
        faculty: "q;wlkeq",
      },
      {
        name: "Ббббббб",
        surname: "Ааааааа",
        middleName: "Ббббббб",
        dateOfBirth: new Date(2000, 5, 27),
        startYear: 2019,
        faculty: "some",
      },
    ];
  }
  launch() {
    renderForm(this.students);
    renderFilters(this.students);
    renderTable(this.students);
    addSorts(this.students);
    addSortIcons();
  }
}
