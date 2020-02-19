import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  Media
} from 'reactstrap';

const CardGrid = ({ recipe }) => {
  return (
    <Card className="mb-3">
      <CardBody>
        <Media>
          <Media left>
            <Media object style={{ width: '200px', height: '150px', objectFit: 'cover' }} src={`${process.env.REACT_APP_URL}/image/${recipe.image}`} alt={recipe.image} />
          </Media>
          <Media body className="ml-4" >
            <Media>
              <h2 className="media-heading">
                <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
              </h2>
            </Media>
            <b>Category : {recipe.category.name}</b>
            <p>{`${recipe.step.substring(0, 250)}...`}</p>
          </Media>
        </Media>
      </CardBody>
    </Card>   
  )
}

export default CardGrid;