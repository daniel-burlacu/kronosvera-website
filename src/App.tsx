import { Contact } from './components/Contact';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { MessageSection } from './components/MessageSection';
import { Screenshots } from './components/Screenshots';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <MessageSection />
      <Screenshots />
      <Disclaimer />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
