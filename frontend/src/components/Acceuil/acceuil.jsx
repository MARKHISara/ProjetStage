import Header from '../Header'
import HeroSection from './HeroSection'
import ServicesNettoyage from './TopCleaningServices'
import BlogList from '../Blog/BlogList'
import FAQ from './FAQ'
import CityGrid from '../city/CityGrid'
import HeroCleanSection from './HeroCleanSection'
import Footer from '../Footer'
export default function Accueil(){
    return(
        <>
        <Header />
        <HeroSection />
        <ServicesNettoyage />
        <BlogList />
        <CityGrid />
        <FAQ />
        <HeroCleanSection />
        <Footer />
        </>
    )

}