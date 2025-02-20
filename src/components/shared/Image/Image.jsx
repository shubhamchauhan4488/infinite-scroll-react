import React, { useState } from 'react';

const Image = ({ src, alt, loader = null, className, ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);

    return (
      <>
        {isLoading && loader}
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          className={className}
          style={{ display: isLoading ? 'none' : 'block' }}
          {...rest}
        />
      </>
    )
};

export default Image;