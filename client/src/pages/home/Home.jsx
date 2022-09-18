import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Feature from '../../components/featured/Feature'
import PropertiesList from '../../components/propertieslist/PropertiesList'

import './Home.css'
import FeatureProperties from '../../components/featureProperties/FeatureProperties'
import EmailList from '../../components/emailList/EmailList'
import Footer from '../../components/footer/Footer'



export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Feature />
        <h1 className="homeTitle">
          Browse by property type
        </h1>
        <PropertiesList />
        <h1 className="homeTitle">
          Home guests love
        </h1>
        <FeatureProperties />
        <EmailList />
        <Footer />
      </div>
    </div>
  )
}
