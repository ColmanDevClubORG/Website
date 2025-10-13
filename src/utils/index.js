import validator from 'validator';
import { fetchData } from 'src/hooks/useFirestoreFetch';


const emailValidation = (email) => {
  if (typeof email !== 'string') return false;
  const test = validator.trim(email);
  return validator.isEmail(test);
};

const stringValidation = (name) => {
  if (typeof name !== 'string') return false;
  if (name.length < 3) return false;
  const newName = validator.trim(name);
  const nameValidation = /^[a-zA-Z,\s]+$/;
  return nameValidation.test(newName);
};

const experienceValidation = (name) => {
  if (typeof name !== 'string') return false;
  if (name.length < 3) return false;
  const newName = validator.trim(name);
  const nameValidation = /^[a-zA-Z\u0590-\u05FF,\s]+$/;
  return nameValidation.test(newName);
};

const checkEnglishName = (name) => {
  if (typeof name !== 'string') return '';
  return /^[a-zA-Z ]+$/.test(name) ? name : '';
};

const numberValidation = (number) => {
  if (typeof number !== 'string') return false;
  const newNumber = validator.trim(number);
  if (!validator.isNumeric(newNumber)) return false;
  if (newNumber.length !== 10) return false;
  return true;
};

const idValidation = (idNumber) => {
  if (typeof idNumber !== 'string') return false;

  idNumber = idNumber.replace(/\D/g, '');
  if (idNumber.length !== 9) return false;

  const idDigits = idNumber.split('').map(Number);
  const controlDigit = idDigits.pop();
  const sum = idDigits.reduce((acc, digit, index) => {
    const weight = index % 2 === 0 ? 1 : 2;
    const value = digit * weight;
    return acc + (value > 9 ? value - 9 : value);
  }, 0);

  const calculatedControlDigit = (10 - (sum % 10)) % 10;
  return controlDigit === calculatedControlDigit;
};

const passwordValidation = (password) => {
  if (typeof password !== 'string') return false;
  return password.trim().length >= 6;
};

const selectionValidation = (selectValue) => {
  if (typeof selectValue !== 'string') return false;
  return !validator.isEmpty(selectValue);
};


export function normalizeEmail(raw) {
  return String(raw || '').trim().toLowerCase();
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email));
}

export function isValidPhoneIL(phone) {
  return /^\d{9,10}$/.test(String(phone));
}

export function validateTryoutForm(form) {
  const fullName = String(form.fullName || '').trim();
  const email = normalizeEmail(form.email);
  const phoneNumber = String(form.phoneNumber || '').trim();
  const preferredDate = String(form.preferredDate || '').trim();
  const experience = String(form.experience || '').trim();
  const experienceDetails = String(form.experienceDetails || '').trim();
  const fieldOfStudy = String(form.fieldOfStudy || '').trim();
  const schoolYear = String(form.schoolYear || '').trim();

  const errors = [];

  if (!fullName) errors.push('שם מלא הוא שדה חובה');
  if (!email) errors.push('אימייל הוא שדה חובה');
  if (!phoneNumber) errors.push('טלפון הוא שדה חובה');
  if (!preferredDate) errors.push('תאריך מועדף הוא שדה חובה');
  if (!experience) errors.push('שדה ניסיון הוא חובה');
  if (!fieldOfStudy) errors.push('שדה תחום לימוד הוא חובה');
  if (!schoolYear) errors.push('שדה שנת לימוד הוא חובה');

  if (experience === 'כן' && !experienceDetails) errors.push('נא לפרט ניסיון');
  if (email && !isValidEmail(email)) errors.push('פורמט אימייל לא תקין');
  if (phoneNumber && !isValidPhoneIL(phoneNumber)) errors.push('מספר טלפון לא תקין');

  return {
    ok: errors.length === 0,
    errors,
    normalized: {
      fullName,
      email,
      phoneNumber,
      preferredDate,
      experience,
      experienceDetails,
      fieldOfStudy,
      schoolYear,
    },
  };
}

export const fetchAllUsers = async () => {
  const users = await fetchData('users');
  // console.log('users[0] ', users[0].formValues);
  // eslint-disable-next-line array-callback-return
  users.map((user) => {
    sendDataToAgudaForm(
      user.formValues.email,
      user.formValues.fullName,
      user.formValues.phoneNumber,
      'הפקולטה למדעי המחשב',
      'מועדון המפתחים',
      'שנה ' + user.formValues.schoolYear + "'",
      'טובה מאוד',
      '',
      false,
      false
    );
  });
};

export const sendDataToAgudaForm = async (
  email,
  fullName,
  phoneNumber,
  Ext2,
  Ext1,
  Ext3,
  Ext4,
  Ext5,
  ConfirmEmails,
  ConfirmTerms
) => {
  const formData = new URLSearchParams();
  formData.append('ConfirmEmails', ConfirmEmails);
  formData.append('ConfirmTerms', ConfirmTerms);
  formData.append('EncryptedUserId', 'zeetfzdwwh2d');
  formData.append('EncryptedPageId', 'zfwwadd2ccup');
  formData.append('Ext1', Ext1);
  formData.append('Ext2', Ext2);
  formData.append('Ext3', Ext3);
  formData.append('Ext4', Ext4);
  formData.append('Ext5', Ext5);
  formData.append('FirstName', String(fullName || '').split(' ')[0] || '');
  formData.append('LastName', String(fullName || '').split(' ')[1] || '');
  formData.append('Phone1', phoneNumber || '');
  formData.append('Email', email || '');

  // const response = await axios.post('https://webapi.mymarketing.co.il/Customers/LeadHandler.ashx', formData, {
  //   headers: {
  //     Accept: 'application/json, text/javascript, */*; q=0.01',
  //     'Accept-Encoding': 'gzip, deflate, br',
  //     'Accept-Language': 'he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7',
  //     Connection: 'keep-alive',
  //     'Content-Length': '416',
  //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  //     Host: 'webapi.mymarketing.co.il',
  //     Origin: 'https://colmanaguda.activetrail.biz',
  //     Referer: 'https://colmanaguda.activetrail.biz/',
  //     'Sec-Ch-Ua': 'Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121',
  //     'Sec-Ch-Ua-Mobile': '?0',
  //     'Sec-Ch-Ua-Platform': 'Windows',
  //     'Sec-Fetch-Dest': 'empty',
  //     'Sec-Fetch-Mode': 'cors',
  //     'Sec-Fetch-Site': 'cross-site',
  //     'User-Agent':
  //       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  //     'Access-Control-Allow-Origin': '*',
  //   },
  // });
};


export {
  emailValidation,
  stringValidation,
  experienceValidation,
  numberValidation,
  selectionValidation,
  idValidation,
  passwordValidation,
  checkEnglishName,
};
