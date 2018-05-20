export default class Datapickers {
  constructor(redDays, greenDays) {
    this.redDays = redDays;
    this.greenDays = greenDays;
    this.init();
  }

  initDatapicker(ElementName, Month, arrayDays, ClassDays) {
    $(ElementName).datepicker({
      weekStart: 1,
      language: "ru",
      keyboardNavigation: false,
      forceParse: false,
      daysOfWeekDisabled: "0,6",
      todayHighlight: true,
      datesDisabled: ['09/05/2018', '04/05/2018'],
      autoclose: true,
    }).on('changeDate', (e) => {
      this.setDays(ElementName, Month, arrayDays, ClassDays);
    })
    $(ElementName).trigger('changeDate');
  }

  setDays(ElementName, Month, arrayDays, ClassDays) {
    const monthName = document.querySelector(ElementName);
    const days = document.querySelectorAll(ElementName + ".datepicker-days .table-condensed td.day");

    if (monthName.innerText.indexOf(Month) != -1) {
      days.forEach(day => {
        for (let elemArr of arrayDays) {
          if (elemArr === Number(day.innerText)) {
            day.classList.add(ClassDays);
          }
        }
      });
    }
  }

  init() {
    this.initDatapicker('#sandbox-container div', 'Май', this.redDays, 'red-day');
    this.initDatapicker('#sandbox-container2 div', 'Май', this.greenDays, 'green-day');
  }
}
const a = new Datapickers([15, 16], [10, 11]);