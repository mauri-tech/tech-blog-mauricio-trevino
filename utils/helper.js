// Utility functions for date and time formatting
module.exports = {
    // Function to format time from a given date
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
  
    // Function to format date from a given date
    format_date: (date) => {
      // Using JavaScript Date methods, extract and format the month, date, and year components
      const month = new Date(date).getMonth() + 1; // Month is zero-based, so adding 1
      const day = new Date(date).getDate();
      const year = new Date(date).getFullYear();
  
      // Return the formatted date string in the format "month/day/year"
      return `${month}/${day}/${year}`;
    },
  };