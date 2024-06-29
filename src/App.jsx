<<<<<<< HEAD
import AIInterviewer from "./components/AIInterviewer.jsx"
=======
import './App.css'
// import AIInterviewer from "./components/AIInterviewer.jsx"
import AIInsurance from "./components/AIInsurance.jsx"
import TCnav from "./assets/TCnav.png"
>>>>>>> 31a363bdca00f32d867696daf12ceab34d3366b8

//Note - use import.meta.env.VITE_REACT_APP_BACKEND_URL for the endpoint - this is saved in GitHub secrets

function App() {

  return (
    
    <div className='body'>
        <img className='nav' src={TCnav} alt="nav" />
        {/* <AIInterviewer /> */}
        <AIInsurance />

    </div>
  )
}

export default App
