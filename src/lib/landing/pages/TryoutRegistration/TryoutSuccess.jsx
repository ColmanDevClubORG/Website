import { Container, Box, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TryoutSuccess = () => {
  const navigate = useNavigate();

  const btnSx = { borderColor: '#f6c927', color: '#f6c927' };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
        נרשמת ליום המיון בהצלחה!
      </Typography>

      <Box sx={{ display: 'grid', gap: 3, mt: 2 }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate('/signup')}
              sx={btnSx}
            >
              הרשמה לאתר
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={btnSx}
            >
              לעמוד הבית
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TryoutSuccess;
