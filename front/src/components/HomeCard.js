import React from "react";
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button';

const cardStyle = {
    marginBottom: 15,
    cursor:'pointer'
}

const HomeCard = props => {
    return (
        <Link to={props.linkToRedirect} style={{ textDecoration: 'none', color: '#212529' }}>
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>{ props.title }</Card.Title>
                    <Card.Text>
                        { props.text }
                    </Card.Text>
                    {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
            </Card>
        </Link>
    );
}
export default HomeCard;
