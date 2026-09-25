import "../index.css";
import CompanyDetails from "../Components/compnayDetails";
import TankService from "../Components/tankServices";
import Hero from "../Components/Hero";
import ContactInfo from "../Components/contactInfo";
import LocationInfo from "../Components/LocationInfo";
import ChooseInfo from "../Components/ChooseInfo";

function Home() {
  return (
    <>
      <Hero/>
      <CompanyDetails/>
      <TankService/>
      <ChooseInfo/>
      <ContactInfo/>
      <LocationInfo />
    </>
  );
}

export default Home;
