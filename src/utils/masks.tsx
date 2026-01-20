function maskPhone(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1)$2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  return value;
}

function maskCurrency(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return value;
}

function maskVisaCard(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{4})(?=.)/g, '$1 ');
  return value;
}

function maskAmericanExpress(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/\b(\d{4})(\d{6})(\d{5})\b/, '$1-$2-$3');
  return value;
}

function maskHiddenVisaCard(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{4}(?!\s))/g, "$1 ");
  return value;
}

function maskExpDate(value: string) {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d{2}).*$/, '$1/$2');
  return value;
}

function maskName(value: string) {
  value = value.replace(/[^a-zA-Z0-9\s]/g, '');
  return value;
}


export { maskPhone, maskCurrency, maskVisaCard, maskHiddenVisaCard, maskExpDate, maskName };