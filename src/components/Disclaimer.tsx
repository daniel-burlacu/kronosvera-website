import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { principles } from '../data/content';

export function Disclaimer() {
  return (
    <Box id="disclaimer" component="section" sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="lg"><Paper className="disclaimer-box"><Grid container spacing={4}><Grid size={{ xs: 12, md: 5 }}><Typography className="section-kicker">Important disclaimer</Typography><Typography variant="h2" sx={{ fontSize: { xs: 36, md: 50 }, mt: 1 }}>KronosVera is not a medical app.</Typography></Grid><Grid size={{ xs: 12, md: 7 }}><Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.85 }}>KronosVera does not provide medical advice, diagnosis, treatment, emergency support, or healthcare services. It is an awareness and motivation tool that helps users reflect on lifestyle choices. For health concerns, users should speak with a qualified professional.</Typography></Grid></Grid><Grid container spacing={2} sx={{ mt: 3 }}>{principles.map(({ icon: Icon, title, text }) => (<Grid key={title} size={{ xs: 12, md: 4 }}><Box className="principle-item"><Icon /><Typography variant="h6">{title}</Typography><Typography color="text.secondary">{text}</Typography></Box></Grid>))}</Grid></Paper></Container>
    </Box>
  );
}
