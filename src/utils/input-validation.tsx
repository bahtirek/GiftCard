function isEmpty(value: string | null) {
  if(value) {
    return ''
  } else {
    return 'Field is required'
  }
}

function validateAmount (value: string, minValue: string) {
  const amount = parseInt(value.replace(/\s/g, ''));
  const minAmount = parseInt(minValue.replace(/\s/g, ''));
  
  return !value || amount >= minAmount
}

function validateRedeemAmount (value: string, balanceValue: string) {
  const amount = parseInt(value.replace(/\s/g, ''));
  const balance = parseInt(balanceValue.replace(/\s/g, ''));
  
  return !value || amount <= balance
}

function validateEmail(value: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !value || emailRegex.test(value)
}

function validateCreditCard(value: string) {
  const ccRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  value = value.replace(/\s/g, '')
  return ccRegex.test(value)

  /* 
    const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const mastercardRegex = /^5[1-5][0-9]{14}$/;
    const amexRegex = /^3[47][0-9]{13}$/;
    const discoverRegex = /^6(?:011|5[0-9]{2})[0-9]{12}$/;
    const dinersRegex = /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/;
    const jcbRegex = /^(?:2131|1800|35[0-9]{3})[0-9]{11}$/;
    visa '^4[0-9]',
    multi
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35[0-9]{3})[0-9]{11})$/
  */
}

function validateLength(value: string, minLength: number, errorText? : string) {
  return (value.length == 0 || value.length >= minLength)
}

function validateExpDate(value: string) {
  const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return (expDateRegex.test(value) && validateDate(value))
}

function validateDate(value: string) {
  const expDate = value.split('/');
  const expMonth = parseInt(expDate[0]);
  const expYear = parseInt(expDate[1]);
  const today = new Date();
  const currentMonth = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
  const currentYear = parseInt(String(today.getFullYear()).slice(-2));
  if(expMonth >= currentMonth && expYear >= currentYear){
    return true
  } else {
    return false
  }
}

function validateLuhnAlgorithm(value: string) {
  const sumDigit:any = (c: number) => (c < 10) ? c :
  sumDigit( Math.trunc(c / 10) + (c % 10));

return value.split('').reverse()
  .map(Number)
  .map((c, i) => i % 2 !== 0 ? sumDigit(c * 2) : c)
  .reduce((acc,v) => acc + v) % 10 === 0;

  //4417 1234 5678 9113
  //5500 0000 0000 0004
}

export {
  isEmpty,
  validateAmount,
  validateEmail,
  validateCreditCard,
  validateLength, 
  validateExpDate,
  validateRedeemAmount
}