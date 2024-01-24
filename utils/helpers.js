// Module: Date formatting utility functions
module.exports = {
  // Function: Format time from a given date
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  // Function: Format date from a given date
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5
    }`;
  },
};
