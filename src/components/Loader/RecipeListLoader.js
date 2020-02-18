import React from 'react';
import ContentLoader from "react-content-loader" 

const RecipeListLoader = () => {
  return (
    <React.Fragment>
      <ContentLoader 
        speed={1.3}
        height={200}
        width={1000}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="25" y="25" rx="0" ry="0" width="200" height="150" />
        <rect x="250" y="40" rx="5" ry="5" width="120" height="15" />
        <rect x="250" y="80" rx="5" ry="5" width="220" height="15" />
        <rect x="250" y="105" rx="5" ry="5" width="190" height="15" />
      </ContentLoader>
      <ContentLoader 
        speed={1.3}
        height={200}
        width={1000}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="25" y="25" rx="0" ry="0" width="200" height="150" />
        <rect x="250" y="40" rx="5" ry="5" width="120" height="15" />
        <rect x="250" y="80" rx="5" ry="5" width="220" height="15" />
        <rect x="250" y="105" rx="5" ry="5" width="190" height="15" />
      </ContentLoader>
      <ContentLoader 
        speed={1.3}
        height={200}
        width={1000}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="25" y="25" rx="0" ry="0" width="200" height="150" />
        <rect x="250" y="40" rx="5" ry="5" width="120" height="15" />
        <rect x="250" y="80" rx="5" ry="5" width="220" height="15" />
        <rect x="250" y="105" rx="5" ry="5" width="190" height="15" />
      </ContentLoader>    
    </React.Fragment>    
  )
}

export default RecipeListLoader;