import './App.css';
import React, { useState } from 'react';
import TruckManager from './components/TruckManager';
import NavigationBar from './components/NavigationBar';
import Cover from './components/Cover';
import Footer from './components/Footer';
import LeftSidebar from './components/LeftSidebar';
import { BrowserRouter as Router} from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';


function App() {

  const [currentPage, setCurrentPage] = useState(<TruckManager />);

  return (
    <Router>
      <div>
        <NavigationBar />
        <Cover />
        <Container className='mt-3'>
          <Row>
            <Col md={2}>
              <LeftSidebar setCurrentPage={setCurrentPage} />
            </Col>
            <Col md={10}>
              {currentPage}
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
