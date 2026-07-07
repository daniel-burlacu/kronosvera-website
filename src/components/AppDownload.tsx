import { Box, Button, Container, Stack, Typography } from '@mui/material';
import GetAppRoundedIcon from '@mui/icons-material/GetAppRounded';

export function AppDownload() {
    return (
        <Box component="section" sx={{ py: { xs: 8, md: 12 }, background: 'linear-gradient(135deg, rgba(24, 184, 79, 0.08), rgba(244, 196, 48, 0.08))', borderTop: '1px solid rgba(6, 24, 38, 0.1)' }}>
            <Container maxWidth="lg">
                <Stack spacing={4} alignItems="center" textAlign="center">
                    <Stack spacing={2}>
                        <Typography variant="h2" sx={{ fontSize: { xs: 36, sm: 48, md: 56 } }}>
                            Ready for Android
                        </Typography>
                        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
                            Download KronosVera from the Google Play Store and start your journey toward better lifestyle awareness today.
                        </Typography>
                    </Stack>
                    <Button
                        href="https://play.google.com/store/apps/details?id=com.kronosvera.app&hl=es_419"
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="contained"
                        size="large"
                        endIcon={<GetAppRoundedIcon />}
                        sx={{
                            borderRadius: 999,
                            px: 4,
                            py: 1.6,
                            background: 'linear-gradient(90deg, #18b84f, #f4c430)',
                            fontSize: '1.1rem',
                            fontWeight: 800,
                            '&:hover': {
                                boxShadow: '0 8px 24px rgba(24, 184, 79, 0.3)',
                            },
                        }}
                    >
                        Get on Google Play
                    </Button>
                </Stack>
            </Container>
        </Box>
    );
}
