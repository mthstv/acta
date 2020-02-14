import React from "react";
import globalStyles from "../styles";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const HomePage = () => {
  return (
    <div>
      <h3 style={globalStyles.navigation}>Application / Home</h3>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomePage;
