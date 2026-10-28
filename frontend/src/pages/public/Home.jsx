import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/layout/Hero";
import FeaturedRooms from "../../components/rooms/FeaturedRooms";
import Experiences from "../../components/experiences/Experiences";
import HavenStory from "../../components/about/HavenStory";
import StayYourWay from "../../components/booking/StayYourWay";
import Footer from "../../components/layout/Footer";

function Home() {
  return (
    <main>
      <Navbar />

      <Hero />

      <FeaturedRooms />

      <Experiences />

      <HavenStory />

      <StayYourWay />

      <Footer />
    </main>
  );
}

export default Home;