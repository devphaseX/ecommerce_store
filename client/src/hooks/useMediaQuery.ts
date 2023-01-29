import { useEffect, useMemo, useState } from 'react';

const useMediaQuery = (media: string) => {
  const query = useMemo(() => window.matchMedia(media), [media]);
  const [queryMatch, setQueryMatch] = useState(query.matches);

  useEffect(() => {
    const queryMatchHandler = () => setQueryMatch(query.matches);

    query.addEventListener('change', queryMatchHandler);
    return () => query.removeEventListener('change', queryMatchHandler);
  }, []);

  return queryMatch;
};

export { useMediaQuery };
