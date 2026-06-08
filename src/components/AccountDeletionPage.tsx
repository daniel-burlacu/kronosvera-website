import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Link,
    Stack,
    Typography,
} from '@mui/material';

export const AccountDeletionPage = () => {
    return (
        <Box
            id="account-deletion"
            component="section"
            sx={{
                minHeight: '100vh',
                backgroundColor: '#ffffff',
                py: { xs: 5, md: 8 },
            }}
        >
            <Container maxWidth="md">
                <Stack spacing={4}>
                    <Box>
                        <Typography
                            component="h1"
                            variant="h3"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                            }}
                        >
                            Account Deletion Request
                        </Typography>

                        <Typography variant="body1" color="text.secondary">
                            KronosVera allows users to request deletion of their account and
                            associated personal data.
                        </Typography>
                    </Box>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography component="h2" variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                                Delete your account from inside the app
                            </Typography>

                            <Typography variant="body1" paragraph>
                                If you still have access to the KronosVera app, you can request
                                account deletion directly inside the app.
                            </Typography>

                            <Typography component="div" variant="body1">
                                <ol>
                                    <li>Open the KronosVera app</li>
                                    <li>Go to Profile or Settings</li>
                                    <li>Select Delete Account</li>
                                    <li>Confirm the deletion request</li>
                                </ol>
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography component="h2" variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                                Request deletion without the app
                            </Typography>

                            <Typography variant="body1" paragraph>
                                If you no longer have access to the app, you can request account
                                deletion by contacting us.
                            </Typography>

                            <Typography variant="body1" paragraph>
                                Please include the email address used to create your KronosVera
                                account so we can identify the correct account.
                            </Typography>

                            <Stack spacing={1.5} sx={{ mt: 2 }}>
                                <Typography variant="body1">
                                    Email:{' '}
                                    <Link href="mailto:daniel[dot]burlacu1983[at]yahoo[dot]se">
                                        daniel[dot]burlacu1983[at]yahoo[dot]se
                                    </Link>
                                </Typography>

                                <Typography variant="body1">
                                    Discord: <strong>daniel.burlacu</strong>
                                </Typography>

                                <Typography variant="body1">
                                    LinkedIn:{' '}
                                    <Link
                                        href="https://www.linkedin.com/in/daniel-burlacu-3879a689/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Daniel Burlacu
                                    </Link>
                                </Typography>
                            </Stack>

                            <Button
                                variant="contained"
                                href="mailto:daniel[dot]burlacu1983[at]yahoo[dot]se?subject=KronosVera%20Account%20Deletion%20Request&body=Hello%2C%0D%0A%0D%0AI%20would%20like%20to%20request%20deletion%20of%20my%20KronosVera%20account.%0D%0A%0D%0AEmail%20used%20for%20KronosVera%3A%20%0D%0A%0D%0AThank%20you."
                                sx={{ mt: 3 }}
                            >
                                Request account deletion by email
                            </Button>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography component="h2" variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                                Data that will be deleted
                            </Typography>

                            <Typography component="div" variant="body1">
                                <ul>
                                    <li>Your KronosVera user account</li>
                                    <li>Lifestyle setup data</li>
                                    <li>Wellness and lifestyle entries</li>
                                    <li>App-related profile data connected to your account</li>
                                </ul>
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card variant="outlined">
                        <CardContent>
                            <Typography component="h2" variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                                Data that may be retained
                            </Typography>

                            <Typography variant="body1" paragraph>
                                Some technical logs or records may be retained temporarily where
                                required for security, fraud prevention, debugging, legal
                                compliance, or abuse prevention.
                            </Typography>

                            <Typography component="h2" variant="h5" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
                                Deletion timeframe
                            </Typography>

                            <Typography variant="body1">
                                We aim to process account deletion requests within 30 days.
                            </Typography>
                        </CardContent>
                    </Card>

                    <Divider />

                    <Typography variant="body2" color="text.secondary">
                        KronosVera is currently in development and testing. KronosVera is
                        not a medical service and does not provide medical advice, diagnosis,
                        or treatment.
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
};