import React, {Component, Fragment} from "react";
import {Carousel, Image} from "react-bootstrap";

import f1 from "../images/f1.jpg";
import drone from "../images/drone.jpg";
import arm from "../images/arm-robot.jpg";


const slideStyle = {maxHeight: "350px", objectFit:"cover", objectPosition: "center"};


class SlideShow extends Component {
    render() {
        return (
            <Carousel>
                <Carousel.Item>
                    <Image fluid className="d-block w-100" style={slideStyle} src={f1} alt="F1 Car"/>
                    <Carousel.Caption>
                        <h3>F1 Car</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image fluid className="d-block w-100" style={slideStyle} src={drone} alt="Drone"/>
                    <Carousel.Caption>
                        <h3>Drone</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image fluid className="d-block w-100" style={slideStyle} src={arm} alt="Third slide"/>
                    <Carousel.Caption>
                        <h3>Arm Robot</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        )
    }
}


export default SlideShow;