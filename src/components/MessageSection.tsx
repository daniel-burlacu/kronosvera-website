import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';

export function MessageSection() {
  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="stretch">
          <Grid size={{ xs: 12, md: 5 }}><Stack spacing={2}><Typography className="section-kicker">The idea</Typography><Typography variant="h2" sx={{ fontSize: { xs: 38, md: 56 } }}>A small reminder that time matters.</Typography><Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.8 }}>Bad habits do not always feel dangerous today. But repeated over time, they can affect energy, mood, strength, recovery, and long-term quality of life. KronosVera exists to make that visible.</Typography></Stack></Grid>
          <Grid size={{ xs: 12, md: 7 }}><Stack spacing={2}>
            <Paper className="message-card"><AccessTimeRoundedIcon /><Box><Typography variant="h6">Time is your most valuable resource</Typography><Typography color="text.secondary">The app encourages users to think about how they spend their days, not only how long they live.</Typography></Box></Paper>
            <Paper className="message-card"><FitnessCenterRoundedIcon /><Box><Typography variant="h6">Every day is you against you</Typography><Typography color="text.secondary">The focus is not comparison with other people. It is about becoming slightly better than yesterday.</Typography></Box></Paper>
            <Paper className="message-card"><WarningAmberRoundedIcon /><Box><Typography variant="h6">Wrong lifestyle choices can have consequences</Typography><Typography color="text.secondary">KronosVera keeps the message honest but not scary: small choices, repeated often, can shape future wellbeing.</Typography></Box></Paper>
          </Stack></Grid>
        </Grid>
      </Container>
    </Box>
  );
}
