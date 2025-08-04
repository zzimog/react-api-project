import { useState, type ChangeEvent } from 'react';
import { type TableRow, Table, Button } from './ui';
import { useFetch } from './utils/useFetch';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource-variable/material-symbols-rounded/wght.css';
import './ui/index.css';

// PALETTE
// https://coolors.co/06080e-007991-9cd3c6-f3f7f4-dfc853

const api_url = 'http://localhost/rest';

const config = {
  title: 'Users',
  endpoint: '/users',
  headers: ['id', 'username', 'status'],
  actions: [
    {
      icon: 'edit',
      label: 'edit',
      action: async ({ id }: TableRow) => {
        const url = config.endpoint + '/' + id;
        const resp = await fetch(url);
        const json = await resp.json();

        alert(JSON.stringify(json, null, '  '));
      },
    },
    {
      icon: 'delete',
      label: 'delete',
      action: async ({ id }: TableRow) => {
        const url = config.endpoint + '/' + id;

        if (confirm('Are you sure?')) {
          const resp = await fetch(url, {
            method: 'delete',
          });
          const json = await resp.json();

          alert(JSON.stringify(json, null, '  '));
        }
      },
    },
  ],
};

const App = () => {
  const {
    data,
    dataUpdatedAt,
    error,
    //errorUpdatedAt,
    isPending,
    isError,
    refetch,
  } = useFetch<TableRow[]>({ url: api_url + config.endpoint + '?sleep=1' });

  const [formData, setFormData] = useState({});

  async function loadForm(id: number) {
    const url = api_url + config.endpoint + '/' + id;
    const resp = await fetch(url);
    const json = await resp.json();

    setFormData(json);
  }

  function handleFormData(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleFormSave() {
    const url = api_url + config.endpoint;
    const resp = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const json = await resp.json();

    if (json.error) {
      alert(json.message);
      return;
    }

    alert(JSON.stringify(json, null, '  '));
  }

  if (isPending) {
    return <b>Pending...</b>;
  }

  if (isError) {
    return <b>Error: {JSON.stringify(error, null, '  ')}</b>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleFormData}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleFormData}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label htmlFor="confirm">Confirm</label>
          <input
            type="password"
            name="confirm"
            id="confirm"
            onChange={handleFormData}
          />
        </div>
        <button onClick={handleFormSave}>Save</button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <h1>{config.title}</h1>
        <Button icon="add" label="New" />
      </div>

      <Table headers={config.headers} actions={config.actions} rows={data} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button icon="refresh" onClick={refetch} />

        <span style={{ marginLeft: '8px' }}>
          Updated at: <b>{dataUpdatedAt?.toLocaleString()}</b>
        </span>
      </div>
    </div>
  );
};

export default App;
