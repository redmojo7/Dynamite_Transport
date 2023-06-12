import './App.css';
import TruckManager from './components/TruckManager';
import NavigationBar from './components/NavigationBar';
import Cover from './components/Cover';
import Footer from './components/Footer';
import FleetList from './components/FleetList';

function App() {

  return (
    
    <div>
      <NavigationBar/>
      <Cover/>
      <TruckManager />
      <br />
      <Footer />
    </div>
    
  );
}

export default App;
