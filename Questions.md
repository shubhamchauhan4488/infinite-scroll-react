quest1: 

how come the threedots is only viisble only once for the first image that load in the modal and not after that. not for even the same image opened in modal again or if i open another modal with different image

ans:

React.lazy will load the module asynchronously the first time it’s rendered. During that initial load, the <Suspense> component displays the fallback (in your case, the ThreeDots loader).
Prop Changes Don't Trigger Suspense Again

Caching of the Loaded Module
Once the LazyImage module has been loaded successfully, it’s cached internally by React. This means that regardless of how many times you open the modal—even if you pass a different image URL—the module itself is not reloaded

Changing the src attribute on the LazyImage does not cause the component to suspend. The Suspense fallback is meant to cover the asynchronous loading of the module, not the asynchronous loading of image data. 


What can be done:
-->to show a loading indicator every time the actual image is loading (not the module), you need to manage this separately. For example, you can:

- Use an internal state within the LazyImage component to track if the image is loading.
- Display a skeleton loader or spinner until the onLoad event of the <img> element is fired.


- also giving 'loader' capability to the Image component itself
```jsx
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
```
Now, without using Suspense, just use the Image componetn like:
```jsx
        <LazyImage
          loading="lazy"
          src={image.urls.small}
          alt={image.alt_description || 'Unsplash Image'}
          className={styles.image}
          loader={<CardSkeleton />}
          // onLoad={() => setIsLoading(false)} // Hide skeleton once loaded
        />
```