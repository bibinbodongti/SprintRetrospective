import React from 'react';
import {Nav,Navbar,Form, FormControl, Button } from 'react-bootstrap';
import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header=({isLogin,handleLogin})=>{
  return(
    <Navbar bg="primary" variant="dark">
    <Navbar.Brand href="/"><b>Sprint Retrospective</b></Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
    <Nav className="login">
      {!isLogin?<Nav.Link href="/login"><Button variant="outline-light">Đăng nhập</Button></Nav.Link>:<Nav.Link href='/logout'><Button variant="outline-light">Đăng xuất</Button></Nav.Link>}
    </Nav>
  </Navbar>
  )
}
export default Header;