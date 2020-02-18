import React from 'react';
import ContentLoader from "react-content-loader" 
import {
  Row,
  Col
} from 'reactstrap';

const RecipeGridLoader = () => {
  return (
    <React.Fragment>
      <Row className="mt-4">
        <Col lg="6" md="6">      
          <ContentLoader 
            speed={1.3}
            height={400}
            width={500}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="500" height="270" />
            <rect x="25" y="305" rx="5" ry="5" width="120" height="15" />
            <rect x="25" y="345" rx="5" ry="5" width="220" height="15" />
            <rect x="25" y="370" rx="5" ry="5" width="190" height="15" />
          </ContentLoader>
        </Col>
        <Col lg="6" md="6">
          <ContentLoader 
            speed={1.3}
            height={400}
            width={500}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="5" ry="5" width="500" height="270" />
            <rect x="25" y="305" rx="5" ry="5" width="120" height="15" />
            <rect x="25" y="345" rx="5" ry="5" width="220" height="15" />
            <rect x="25" y="370" rx="5" ry="5" width="190" height="15" />
          </ContentLoader>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default RecipeGridLoader;