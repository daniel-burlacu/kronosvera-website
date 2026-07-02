import { AppBar, Box, Button, Container, Stack, Toolbar } from '@mui/material';

export function Header() {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(6, 24, 38, 0.08)' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 74, justifyContent: 'space-between' }}>
          <Box component="a" href="#top" aria-label="KronosVera home" sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Box component="img" src="/images/logo-only.png" alt="KronosVera" sx={{ height: { xs: 23, sm: 27 }, width: 'auto', display: 'block' }} />
          </Box>
          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' }, color: 'text.secondary', fontWeight: 700 }}>
            <Box component="a" href="#how-it-works">How it works</Box>
            <Box component="a" href="#roadmap">Coming next</Box>
            <Box component="a" href="#privacy">Privacy</Box>
            <Box component="a" href="#screens">Screens</Box>
            <Box component="a" href="#account-deletion">Account Deletion</Box>
            <Box component="a" href="#contact">Contact</Box>
          </Stack>
          <Button href="#contact" variant="contained" sx={{ borderRadius: 999, px: 2.4, background: 'linear-gradient(90deg, #18b84f, #f4c430, #ff9f1c, #ff4136)', boxShadow: 'none' }}>
            Waiting to be released ...
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
