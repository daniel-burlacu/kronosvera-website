// src/components/PrivacyPage.tsx

import {
    Box,
    Container,
    Divider,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import PrivacyTipRoundedIcon from '@mui/icons-material/PrivacyTipRounded';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';

const updatedDate = 'June 2026';

export function PrivacyPage() {
    return (
        <Box
            id="privacy"
            component="section"
            sx={{
                py: { xs: 8, md: 11 },
                bgcolor: '#ffffff',
            }}
        >
            <Container maxWidth="md">
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 5 },
                        borderRadius: 5,
                        border: '1px solid rgba(6, 24, 38, 0.08)',
                        boxShadow: '0 24px 80px rgba(6, 24, 38, 0.08)',
                    }}
                >
                    <Stack spacing={2} sx={{ mb: 4 }}>
                        <Box
                            sx={{
                                width: 58,
                                height: 58,
                                borderRadius: 3,
                                display: 'grid',
                                placeItems: 'center',
                                color: '#ffffff',
                                background:
                                    'linear-gradient(135deg, #18b84f, #f4c430, #ff9f1c, #ff4136)',
                            }}
                        >
                            <PrivacyTipRoundedIcon fontSize="large" />
                        </Box>

                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: { xs: 38, md: 56 },
                                fontWeight: 900,
                                letterSpacing: '-0.045em',
                            }}
                        >
                            Privacy Policy
                        </Typography>

                        <Typography color="text.secondary">
                            Last updated: {updatedDate}
                        </Typography>

                        <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                            This Privacy Policy explains how KronosVera handles information
                            when you use the app or visit this website. KronosVera is currently
                            in development and testing.
                        </Typography>
                    </Stack>

                    <Divider sx={{ my: 4 }} />

                    <PrivacySection title="1. About KronosVera">
                        KronosVera is a lifestyle awareness app. It helps users reflect on
                        daily habits such as sleep, hydration, nutrition, activity, stress,
                        mood, sugar intake, and work-life balance.
                    </PrivacySection>

                    <PrivacySection title="2. No medical advice">
                        KronosVera is not a medical app. It does not provide medical advice,
                        diagnosis, treatment, healthcare services, emergency support, or
                        medical recommendations. The app is designed for awareness,
                        reflection, and motivation only. If you have health concerns, you
                        should contact a qualified medical professional.
                    </PrivacySection>

                    <PrivacySection title="3. Information the app may collect">
                        During testing or normal app usage, KronosVera may collect information
                        that you choose to provide, such as lifestyle setup answers, daily
                        goals, wellness-related inputs, app preferences, and basic account
                        information needed to use the app.
                    </PrivacySection>

                    <PrivacySection title="4. How the information is used">
                        The information is used to provide lifestyle awareness features,
                        generate app insights, show daily goals, personalize reminders,
                        improve the app experience, fix bugs, and continue development of
                        KronosVera.
                    </PrivacySection>

                    <PrivacySection title="5. Lifestyle and wellness data">
                        Some information you enter may relate to your lifestyle, mood,
                        habits, or wellbeing. KronosVera uses this information only to create
                        awareness-based summaries and suggestions inside the app. These
                        summaries are not medical conclusions.
                    </PrivacySection>

                    <PrivacySection title="6. Notifications">
                        If notifications are enabled, KronosVera may use your selected daily
                        goal and lifestyle signals to send supportive reminders. You can
                        disable notifications from your device settings or app settings when
                        available.
                    </PrivacySection>

                    <PrivacySection title="7. Data sharing">
                        KronosVera does not sell your personal data. Data may be processed by
                        services required to run the app, such as authentication, hosting,
                        database, analytics, crash reporting, or AI-related infrastructure,
                        only when needed for app functionality and improvement.
                    </PrivacySection>

                    <PrivacySection title="8. Data storage and security">
                        Reasonable technical and organizational measures are used to protect
                        user information. However, no system is completely secure, and no
                        method of transmission or storage can be guaranteed to be 100% safe.
                    </PrivacySection>

                    <PrivacySection title="9. Data retention">
                        Information is kept only for as long as needed to provide the app,
                        improve the service, comply with legal obligations, resolve issues,
                        or continue testing. You may request deletion of your information by
                        contacting the project owner.
                    </PrivacySection>

                    <PrivacySection title="10. Your rights">
                        Depending on your location, you may have rights to access, correct,
                        delete, restrict, or object to the processing of your personal data.
                        You may also have the right to request a copy of your data or withdraw
                        consent where consent is used.
                    </PrivacySection>

                    <PrivacySection title="11. Children">
                        KronosVera is not intended for children. The app should not be used
                        by anyone under the minimum age required by applicable law or platform
                        rules.
                    </PrivacySection>

                    <PrivacySection title="12. Changes to this policy">
                        This Privacy Policy may be updated as KronosVera continues development.
                        When changes are made, the updated version will be posted on this page
                        with a new updated date.
                    </PrivacySection>

                    <Divider sx={{ my: 4 }} />

                    <Stack spacing={2}>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
                                gap: 2,
                                p: 3,
                                borderRadius: 4,
                                bgcolor: 'rgba(24, 184, 79, 0.06)',
                                border: '1px solid rgba(24, 184, 79, 0.14)',
                            }}
                        >
                            <ShieldRoundedIcon sx={{ color: '#18b84f', fontSize: 34 }} />
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                    Contact
                                </Typography>
                                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    For privacy questions, testing feedback, or deletion requests,
                                    contact Daniel Burlacu through LinkedIn or Discord.
                                </Typography>

                                <Typography sx={{ mt: 1.5 }}>
                                    LinkedIn:{' '}
                                    <Box
                                        component="a"
                                        href="https://www.linkedin.com/in/daniel-burlacu-3879a689/"
                                        target="_blank"
                                        rel="noreferrer"
                                        sx={{ color: '#0a66c2', fontWeight: 800 }}
                                    >
                                        Daniel Burlacu
                                    </Box>
                                </Typography>

                                <Typography>
                                    Discord:{' '}
                                    <Box component="span" sx={{ fontWeight: 800 }}>
                                        daniel.burlacu
                                    </Box>
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'auto 1fr' },
                                gap: 2,
                                p: 3,
                                borderRadius: 4,
                                bgcolor: 'rgba(255, 159, 28, 0.07)',
                                border: '1px solid rgba(255, 159, 28, 0.18)',
                            }}
                        >
                            <HealthAndSafetyRoundedIcon sx={{ color: '#ff9f1c', fontSize: 34 }} />
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                                    Important reminder
                                </Typography>
                                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                                    KronosVera is about awareness. It is not a replacement for a
                                    doctor, therapist, emergency service, or qualified healthcare
                                    professional.
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}

type PrivacySectionProps = {
    title: string;
    children: string;
};

function PrivacySection({ title, children }: PrivacySectionProps) {
    return (
        <Box sx={{ mb: 3.5 }}>
            <Typography
                variant="h5"
                sx={{
                    fontWeight: 900,
                    letterSpacing: '-0.02em',
                    mb: 1,
                }}
            >
                {title}
            </Typography>

            <Typography
                color="text.secondary"
                sx={{
                    lineHeight: 1.85,
                    fontSize: 16.5,
                }}
            >
                {children}
            </Typography>
        </Box>
    );
}