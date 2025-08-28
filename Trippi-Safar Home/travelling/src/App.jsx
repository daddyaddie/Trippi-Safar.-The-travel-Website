import './App.css'
import Nav from './Components/Nav/Nav'
import Header from './Components/Header/Header'
import Memories from './Components/Memories/Memories'
import Trips from './Components/Trips/Trips'
import Searches from './Components/Searches/Searches'
import About from './Components/About/About'
import Testimonial from './Components/Testimonial/Testimonial'
import Destination from './Components/Destination/Destination'
import CallToAction from './Components/Footer/CallToAction'
import Footer from './Components/Footer/Footer'
function App() {

  return (
  <>
<div className ='main'>
  <Nav />
  <Header />
  <Memories />
</div>
  <Trips />
<CallToAction />
<div className="main">
  <About />
<Testimonial />
<Destination />
   <Searches />
<Footer />
</div>
{/* <div className="main">
</div> */}
  </>
  )
}

export default App
