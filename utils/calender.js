const { VanillaCalendar } = require("../node_modules/vanilla-calendar-pro");

module.exports = {
  calendar: () => {
    const calendar = new VanillaCalendar(".calendar");
    calendar.init();
  },
};
