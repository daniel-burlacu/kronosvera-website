import { Box, Button, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import SelfImprovementRoundedIcon from '@mui/icons-material/SelfImprovementRounded';

export function Hero() {
  return (
    <Box id="top" component="section" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Chip icon={<HealthAndSafetyRoundedIcon />} label="Non-medical" className="soft-chip" />
                <Chip icon={<SelfImprovementRoundedIcon />} label="Lifestyle awareness" className="soft-chip" />
              </Stack>
              <Typography variant="h1" sx={{ fontSize: { xs: 52, sm: 70, md: 86 }, lineHeight: 0.94 }}>
                Your life.<Box component="span" className="gradient-text" sx={{ display: 'block' }}>Your time.</Box>Your future.
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 640, lineHeight: 1.55 }}>
                KronosVera is a lifestyle awareness app built around one simple idea: time is precious, and the way we live today can have real consequences later.
              </Typography>
              <Typography color="text.secondary" sx={{ maxWidth: 620, lineHeight: 1.8 }}>
                It does not offer medical advice. It helps users reflect on daily habits, understand lifestyle patterns, and take small actions. Every day is a fight: you against you.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button href="#how-it-works" variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ borderRadius: 999, px: 3, py: 1.4, background: 'linear-gradient(90deg, #18b84f, #f4c430, #ff9f1c, #ff4136)' }}>See how it works</Button>
                <Button href="#contact" variant="outlined" size="large" sx={{ borderRadius: 999, px: 3, py: 1.4, borderColor: 'rgba(6,24,38,0.2)' }}>Contact me</Button>
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box className="hero-logo-card"><Box component="img" src="/images/logo-full.png" alt="KronosVera hourglass logo" /></Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
