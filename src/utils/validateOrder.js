const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_PATTERN = /^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u;

function digitsOnly(value) {
  return (value ?? '').replace(/\D/g, '');
}

export function isValidMacedonianPhone(value) {
  const digits = digitsOnly(value);
  if (digits.length === 9 && digits.startsWith('07')) return true;
  if (digits.length === 11 && digits.startsWith('3897')) return true;
  if (digits.length === 12 && digits.startsWith('003897')) return true;
  return false;
}

export function validateOrderForm({ name, email, shippingAddress, city, phone, notes }, cities) {
  const errors = {};
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedAddress = shippingAddress.trim();
  const trimmedCity = city.trim();
  const trimmedPhone = phone.trim();
  const trimmedNotes = notes.trim();

  if (!trimmedName) {
    errors.name = 'Внесете го вашето име.';
  } else if (trimmedName.length < 2) {
    errors.name = 'Името мора да има најмалку 2 карактери.';
  } else if (!NAME_PATTERN.test(trimmedName)) {
    errors.name = 'Името може да содржи само букви, празни места и цртички.';
  }

  if (!trimmedEmail) {
    errors.email = 'Внесете е-пошта.';
  } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = 'Внесете валидна е-пошта (пр. ime@gmail.com).';
  }

  if (!trimmedAddress) {
    errors.shippingAddress = 'Внесете адреса за достава.';
  } else if (trimmedAddress.length < 5) {
    errors.shippingAddress = 'Адресата мора да има најмалку 5 карактери.';
  }

  if (!trimmedCity) {
    errors.city = 'Изберете град.';
  } else if (Array.isArray(cities) && !cities.includes(trimmedCity)) {
    errors.city = 'Изберете град од листата.';
  }

  if (!trimmedPhone) {
    errors.phone = 'Внесете телефонски број.';
  } else if (!isValidMacedonianPhone(trimmedPhone)) {
    errors.phone = 'Внесете валиден македонски број (пр. 070123456 или +38970123456).';
  }

  if (trimmedNotes.length > 500) {
    errors.notes = 'Забелешката може да има најмногу 500 карактери.';
  }

  return errors;
}
