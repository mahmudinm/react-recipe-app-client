import React from 'react';
import ContentLoader from "react-content-loader" 

const RecipeShowLoader = () => {
  return (
    <ContentLoader 
      speed={1.3}
      height={820}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="1200" height="450" />
      <rect x="26" y="487" rx="5" ry="5" width="300" height="17" />
      <rect x="26" y="538" rx="5" ry="5" width="250" height="15" />
      <rect x="26" y="574" rx="5" ry="5" width="250" height="15" />
      <rect x="41" y="605" rx="5" ry="5" width="250" height="15" />
      <rect x="26" y="635" rx="5" ry="5" width="250" height="15" />
      <rect x="41" y="675" rx="5" ry="5" width="250" height="15" />
    </ContentLoader>  
  )
}

export default RecipeShowLoader;