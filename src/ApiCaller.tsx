import { useState } from 'react';
import styled from '@emotion/styled';

const API_URL_BASE = 'http://localhost/api/';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',

  ['& .toolbar']: {
    border: '1px solid black',
    padding: '0.5rem',

    ['button']: {
      padding: '0.2rem',
      marginLeft: '0.5rem',
    },
  },

  ['& pre']: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid gray',
    marginTop: '0.5rem',
  },
});

const ApiCaller = () => {
  const [api, setApi] = useState<string>('');
  const [json, setJson] = useState<string>('{}');

  async function handleClick() {
    const resp = await fetch(API_URL_BASE + api);
    const json = await resp.json();

    console.log(resp);
    setJson(JSON.stringify(json, null, '  '));
  }

  return (
    <Container>
      <div>
        <div className="toolbar">
          {API_URL_BASE}
          <input
            type="text"
            value={api}
            onChange={(e) => setApi(e.target.value)}
          />
          <button onClick={handleClick}>Call</button>
        </div>
        <div>
          <pre>{json}</pre>
        </div>
      </div>
    </Container>
  );
};

export default ApiCaller;
