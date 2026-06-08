import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import { appSections } from '../data/content';

export function HowItWorks() {
  return (
    <Box id="how-it-works" component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: '#fbfcfb' }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 5, maxWidth: 760 }}>
          <Typography className="section-kicker">How the app works</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: 38, md: 56 } }}>Simple awareness, not complicated health advice.</Typography>
          <Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.8 }}>KronosVera gives users small moments of awareness: what they are doing well, what may be hurting their wellbeing, and what they can improve today.</Typography>
        </Stack>
        <Grid container spacing={3}>
          {appSections.map(({ icon: Icon, title, text }) => (
            <Grid key={title} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card className="info-card"><CardContent sx={{ p: 3 }}><Box className="icon-circle"><Icon /></Box><Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 900 }}>{title}</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>{text}</Typography></CardContent></Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
