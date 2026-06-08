import { Box, Card, CardContent, Container, Grid, Stack, Typography } from '@mui/material';
import { screenshots } from '../data/content';

export function Screenshots() {
  return (
    <Box id="screens" component="section" sx={{ py: { xs: 8, md: 11 }, bgcolor: '#fbfcfb' }}>
      <Container maxWidth="lg">
        <Stack spacing={2} sx={{ mb: 5, maxWidth: 760 }}><Typography className="section-kicker">Current app screens</Typography><Typography variant="h2" sx={{ fontSize: { xs: 38, md: 56 } }}>Built for quick daily reflection.</Typography><Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.8 }}>The app is still in development and currently in testing. These screens show the direction of the product and the experience being built.</Typography></Stack>
        <Grid container spacing={3}>
          {screenshots.map((screen) => (
            <Grid key={screen.title} size={{ xs: 12, sm: 6, md: screen.title === 'Dashboard' ? 4 : 2 }}>
              <Card className="screenshot-card"><Box className="screenshot-image-wrap"><Box component="img" src={screen.image} alt={`${screen.title} screen`} /></Box><CardContent><Typography variant="h6" sx={{ fontWeight: 900 }}>{screen.title}</Typography><Typography color="text.secondary" sx={{ lineHeight: 1.6 }}>{screen.text}</Typography></CardContent></Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
