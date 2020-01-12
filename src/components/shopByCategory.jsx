import React, {Component, Fragment} from "react";
import {Container, Row, Col, Image, ListGroup, Button} from "react-bootstrap";

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
]


class ShopByCategory extends Component {
    render() {
        const imageCategoryGroup = imageCategory.map((eachCategory, index) => {
            return (
                <Col xs="12" md="6" className="mb-4">
                    <ListGroup>
                        <ListGroup.Item action className="p-0">
                            <Image fluid className="w-100 rounded-top" src={eachCategory}/>
                                <p className="font-weight-bold">{categories[index]}</p>
                            <Button variant="warning">Telusuri</Button>
                        </ListGroup.Item>
                    </ListGroup>
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