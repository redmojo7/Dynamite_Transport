import './App.css';
import { Container, Row } from 'react-bootstrap';
import Truck from './Components/Truck';
import TruckManager from './Components/TruckManager';

function App() {

  return (
    <Container>
      <Row>
        <h1>Dynamite Transport</h1>
      </Row>
      <TruckManager />
    </Container>
  );
}

export default App;
