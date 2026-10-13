export function formatNumber(value, locale='ru-RU'){
  if(value===undefined||value===null||Number.isNaN(Number(value))) return '0';
  return Number(value).toLocaleString(locale);
}
