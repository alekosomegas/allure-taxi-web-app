import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';

function BasicExample() {
  return (
    <Navbar bg="light" expand="lg" fixed='top'>
      <Container>
        <Navbar.Brand href="/">
          <Image
            src={"/company_logo.png"}
            width={40}
            height={40}
            alt={'logo'}
          />
          Allure Taxi
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/#Ride">Home</Nav.Link>
            <Nav.Link href="/#AboutUs">About Us</Nav.Link>
            <Nav.Link href="/#Contact">Contact</Nav.Link>
            <Nav.Link href="https://www.allure-rent-a-car.com">Rent a Car</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;