import React from "react";
import RuleCard from "../components/RuleCard";
import { Row, Col } from "react-bootstrap";
const HomePage = () => {
  return (
    <div>
      <Row>
        <Col md={12}>
          <RuleCard />
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
