import { Box, Container, Stack, Typography } from '@mui/material';

export function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, borderTop: '1px solid rgba(6,24,38,0.08)' }}><Container maxWidth="lg"><Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}><Typography color="text.secondary">© {new Date().getFullYear()} KronosVera</Typography><Typography color="text.secondary">Your journey. Your choices. Your future.</Typography></Stack></Container></Box>
  );
}
