import { AccountDeletionPage } from "../components/AccountDeletionPage";
import { AppDownload } from "../components/AppDownload";
import { Contact } from "../components/Contact";
import { Disclaimer } from "../components/Disclaimer";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { MessageSection } from "../components/MessageSection";
import { PrivacyPage } from "../components/PrivacyPage";
import { Screenshots } from "../components/Screenshots";
import { UpcomingFeatures } from "../components/UpcomingFeatures";

export function MarketingPage() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <MessageSection />
      <UpcomingFeatures />
      <Screenshots />
      <AppDownload />
      <Disclaimer />
      <PrivacyPage />
      <AccountDeletionPage />
      <Contact />
      <Footer />
    </>
  );
}
