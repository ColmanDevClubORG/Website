import { useState } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import { ArrowButton } from 'src/ui';
import FormInputField from 'src/ui/FormInputField';
import FormSelectField from 'src/ui/FormSelectField';
import { toast } from 'react-toastify';
import { db } from 'src/config/firebase-config';
import { addDoc, collection, serverTimestamp, getDocs, query, where, limit } from 'firebase/firestore';
import { validateTryoutForm } from 'src/utils';
import { useNavigate } from 'react-router-dom';

const COLLECTION = 'tryout_registrations';

const TryoutRegistrationPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    preferredDate: '',
    experience: '',
    experienceDetails: '',
    schoolYear: '',
    fieldOfStudy: '',
  });

  const setField = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const onSubmit = async () => {
    const { ok, errors, normalized } = validateTryoutForm(form);
    if (!ok) {
      toast.error(errors[0]);
      return;
    }

    try {
      const q = query(
        collection(db, COLLECTION),
        where('email', '==', normalized.email),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        toast.error('האימייל הזה כבר נרשם ליום המיון');
        return;
      }

      await addDoc(collection(db, COLLECTION), {
        ...normalized,
        createdAt: serverTimestamp(),
      });

      setForm({
        fullName: '',
        email: '',
        phoneNumber: '',
        preferredDate: '',
        experience: '',
        experienceDetails: '',
        schoolYear: '',
        fieldOfStudy: '',
      });

      navigate('/tryout/success');
    } catch (e) {
      console.error(e);
      toast.error('שגיאה בהרשמה. נסה שוב.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h3"
        sx={{ textAlign: 'center', mb: 6, fontWeight: 700, letterSpacing: '2px' }}
      >
        הרשמה ליום המיון
      </Typography>

      <Box
        sx={{
          backgroundColor: '#0a0a1b',
          border: '1px solid #1F1F53',
          borderRadius: '10px',
          px: { xs: 2, md: 8 },
          py: 4,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: '1rem',
            mb: 3,
          }}
        >
          <FormInputField sx={{ width: '100%' }} label="Full Name (English)" onChange={setField('fullName')} />
          <FormInputField sx={{ width: '100%' }} label="Email" onChange={setField('email')} />
          <FormInputField sx={{ width: '100%' }} label="Phone Number" onChange={setField('phoneNumber')} />

          <FormSelectField
            label="תאריך מועדף ליום המיון"
            options={['2025-11-09', '2025-11-13']}
            onChange={setField('preferredDate')}
          />

          <FormSelectField
            label="Field of Study"
            options={['מדעי המחשב', 'מערכות מידע', 'מדעי הנתונים', 'אחר']}
            onChange={setField('fieldOfStudy')}
          />

          <FormSelectField
            label="School Year"
            options={['א', 'ב', 'ג', 'ד']}
            onChange={setField('schoolYear')}
          />

          <FormSelectField
            label="Experience"
            options={['כן', 'לא']}
            onChange={setField('experience')}
          />

          {form.experience === 'כן' && (
            <Box sx={{ gridColumn: { xs: 'auto', md: '1 / span 2' } }}>
            
              <FormInputField
                sx={{ width: '100%' }}
                label="Experience Details"
                onChange={setField('experienceDetails')}
              />
            </Box>
          )}
        </Box>

        <Grid container justifyContent="center" mt={2}>
          <ArrowButton onClick={onSubmit}>שליחה</ArrowButton>
        </Grid>
      </Box>
    </Container>
  );
};

export default TryoutRegistrationPage;
