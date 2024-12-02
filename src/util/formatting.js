export const currencyFormatter = new Intl.NumberFormat('en-IN', { //Intl.NumberFormat API enables formatting numbers in a locale-sensitive way, en-US formats numbers according to U.S. English conventions
    style: 'currency', //indicates the formatter will format numbers as currency values
    currency: 'INR', //specifies the currency type to use
});