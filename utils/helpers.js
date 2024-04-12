const { DateTime } = require("luxon");

module.exports = {
  format_date: (date, options) => {
    return DateTime.fromJSDate(date, options.zone).toISODate();
  },
};
