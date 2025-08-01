import { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const url = 'http://localhost/rest/users';

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const resp = await fetch(url, {
        signal: abortController.signal,
      });

      const json = await resp.json();

      setData(json);
    };

    fetchData().catch((err) => console.log('Fetch aborted: ' + err));

    return () => {
      abortController.abort('useEffect clean up');
    };
  }, [url]);

  return <pre>{JSON.stringify(data, null, '  ')}</pre>;
};

export default App;
