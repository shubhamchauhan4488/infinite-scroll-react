import { useCallback, useEffect, useRef } from 'react';

const useInfiniteScroll = (loading, hasMore, loadMore) => {
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    console.log('useInfiniteScroll: loading', loading);
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {

      if (entries?.length > 0 && entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, []);

  return lastElementRef;
};

export default useInfiniteScroll;
