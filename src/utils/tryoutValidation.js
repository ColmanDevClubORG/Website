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

  if (experience === 'כן' && !experienceDetails) {
    errors.push('נא לפרט ניסיון');
  }

  if (email && !isValidEmail(email)) {
    errors.push('פורמט אימייל לא תקין');
  }

  if (phoneNumber && !isValidPhoneIL(phoneNumber)) {
    errors.push('מספר טלפון לא תקין');
  }

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
