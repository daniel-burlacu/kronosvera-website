import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";

export function Contact() {
  return (
    <Box id="contact" component="section" sx={{ py: { xs: 8, md: 11 } }}>
      <Container maxWidth="md">
        <Paper className="contact-box">
          <Box
            component="img"
            src="/images/logo-full.png"
            alt="KronosVera"
            className="contact-logo"
          />
          <Typography variant="h2" sx={{ fontSize: { xs: 36, md: 52 }, mt: 3 }}>
            Waiting to be released ...
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 18,
              lineHeight: 1.8,
              maxWidth: 720,
              mx: "auto",
              mt: 2,
            }}
          >
            KronosVera is still being improved. If you want to ask about the
            project, testing, feedback, or collaboration, you can contact me
            directly.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 16,
              lineHeight: 1.9,
              maxWidth: 680,
              mx: "auto",
              mt: 3,
              px: 2,
              py: 2.5,
              borderRadius: 3,
              background: "rgba(88,101,242,0.07)",
              border: "1px solid rgba(88,101,242,0.18)",
            }}
          >
            💬 <strong>Join our Discord community!</strong> We're building
            KronosVera together with you. Share your ideas, tell us what
            features matter most, and help shape the direction of the app.
            Every request is heard — if you want it, we'll build it.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              href="https://www.linkedin.com/in/daniel-burlacu-3879a689/"
              target="_blank"
              rel="noreferrer"
              variant="contained"
              size="large"
              startIcon={<LinkedInIcon />}
              sx={{ borderRadius: 999, px: 3, background: "#0a66c2" }}
            >
              LinkedIn
            </Button>
            <Button
              href="https://discord.gg/ThTENebZP"
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="large"
              startIcon={<ChatRoundedIcon />}
              sx={{
                borderRadius: 999,
                px: 3,
                borderColor: "rgba(6,24,38,0.2)",
              }}
            >
              Discord: KronosVera Community
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
