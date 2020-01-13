import React, {Component, Fragment} from "react";
import {Container, Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap";

import actuator_default from "../images/actuator_default.jpg";
import battery_default from "../images/battery_default.jpg";
import component_default from "../images/component_default.jpg";
import robotic_default from "../images/robotic_default.jpg";
import uav_default from "../images/uav_default.jpg";
import ugv_default from "../images/ugv_default.jpg";


const imageCategory = [
    actuator_default, battery_default, component_default,
    robotic_default, uav_default, ugv_default
];

const categories = [
    "Aktuator & Power System", "Baterai / Charger",
    "Komponen & Peralatan", "Robotik & Kit",
    "UAV / Drone", "UGV /RC Car"
];


class ShopByCategory extends Component {
    render() {
        const imageCategoryGroup = imageCategory.map((eachCategory, index) => {
            return (
                <Col xs="12" md="6" className="mb-4">
                    <Card className="text-white">
                        <Card.Img src={eachCategory} alt={categories[index]} />
                        <Card.ImgOverlay>
                            <Card.Body>
                                <h4 className="font-weight-bold position-relative">
                                    {categories[index]}
                                </h4>
                                <Button variant="warning" className="text-white font-weight-bold">
                                    Telusuri
                                </Button>
                            </Card.Body>
                        </Card.ImgOverlay>
                    </Card>
                </Col>
            )
        })

        return (
            <Container>
                <Row className="align-items-center">
                    {imageCategoryGroup}
                </Row>
            </Container>
        )
    }
}


export default ShopByCategory;