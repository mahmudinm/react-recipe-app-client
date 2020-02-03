import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row
} from "reactstrap";
import { getCategoryRequest } from "store/modules/category/actions";
import Header from "components/Headers/Header.jsx";
import CategoryTable from './CategoryTable';

const CategoryListPage = () => {

  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);

  useEffect(() => {
    dispatch(getCategoryRequest())
  }, [dispatch])

	return (
    <React.Fragment>
      <Header />      
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className=" col">
            <Card className=" shadow">
              <CardHeader className=" bg-transparent">
                <h3 className=" mb-0">Category</h3>
              </CardHeader>
              <CardBody>
                {/*<Row className="icon-examples">*/}

                  <CategoryTable categories={categories} />
                {/*</Row>*/}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </React.Fragment>		
	)
}

export default CategoryListPage;