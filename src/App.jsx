import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Overview from "./components/Overview.jsx";
import Highlights from "./components/Highlights.jsx";
import Residences from "./components/Residences.jsx";
import Amenities from "./components/Amenities.jsx";
import Lifestyle from "./components/Lifestyle.jsx";
import Gallery from "./components/Gallery.jsx";
import Location from "./components/Location.jsx";
import FAQ from "./components/FAQ.jsx";
import Enquiry from "./components/Enquiry.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import StickyMobileCTA from "./components/StickyMobileCTA.jsx";
import BrochureModal from "./components/BrochureModal.jsx";
import { BrochureModalProvider } from "./context/BrochureModalContext.jsx";

export default function App() {
  return (
    <BrochureModalProvider>
      <div className="relative overflow-x-hidden pb-14 md:pb-0">
        <Navbar />
        <main>
          <Hero />
          <Overview />
          <Highlights />
          <Residences />
          <Amenities />
          <Lifestyle />
          <Gallery />
          <Location />
          <FAQ />
          <Enquiry />
        </main>
        <Footer />
        <WhatsAppButton />
        <StickyMobileCTA />
        <BrochureModal />
      </div>
    </BrochureModalProvider>
  );
}
