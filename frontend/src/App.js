import './App.css';
import { Container, Row } from 'react-bootstrap';
import Truck from './Components/Truck';

function App() {

  return (
    <Container>
      <Row>
        <h1>Truck Tracker</h1>
      </Row>
      <Truck />
    </Container>
  );
}

export default App;
