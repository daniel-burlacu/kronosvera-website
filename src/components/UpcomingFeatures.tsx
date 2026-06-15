import { Box, Card, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import { upcomingFeatures } from '../data/content';

export function UpcomingFeatures() {
  return (
    <Box id="roadmap" component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: '#f8faf8' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 7 }} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <Typography className="section-kicker">Coming next</Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: 38, md: 56 } }}>
                Less manual input, more connected awareness.
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.8 }}>
                KronosVera is being built toward a more automatic experience: first on iOS, then with Samsung Health signals, and finally with a Bluetooth bracelet that reflects the user's score in color.
              </Typography>
              <Box className="bracelet-preview">
                <Box component="img" src="/images/KronosVeraBracelet.png" alt="KronosVera Timeline Bracelet concept" />
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={2.5}>
              {upcomingFeatures.map(({ icon: Icon, title, stage, text, points }) => (
                <Card key={title} className="future-card">
                  <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                    <Grid container spacing={2.5} alignItems="flex-start">
                      <Grid size="auto">
                        <Box className="future-icon"><Icon /></Box>
                      </Grid>
                      <Grid size="grow">
                        <Stack direction="row" spacing={1.5} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
                          <Typography variant="h5" sx={{ fontWeight: 900 }}>{title}</Typography>
                          <Chip label={stage} size="small" className="future-chip" />
                        </Stack>
                        <Typography color="text.secondary" sx={{ lineHeight: 1.75, mb: 2 }}>{text}</Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {points.map((point) => (
                            <Chip key={point} label={point} size="small" variant="outlined" className="signal-chip" />
                          ))}
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
