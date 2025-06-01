import { useState } from 'react';
import Table from '@ui/common/Table';
import Modal from '@ui/common/Modal';
import styled from '@utils/styled';
import useQuery from '@utils/useQuery';

const Form = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const FormField = styled.div({
  width: '100%',

  ['label']: {
    display: 'block',
    padding: '0 4px',
    marginBottom: '4px',
  },

  ['input']: {
    padding: '8px',
    border: '1px solid gray',
    borderRadius: '4px',
  },
});

export type UserModel = {
  id: number;
  username: string;
  hash: string;
  email: string;
};

export const Entity = (props: { id: number }) => {
  const { id } = props;
  const { data, isPending } = useQuery<UserModel>(`/users/${id}`, {
    delay: 1000,
  });

  if (isPending) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <Form>
      <FormField>
        <label htmlFor="id">ID</label>
        <input id="id" type="text" defaultValue={id} disabled />
      </FormField>
      <FormField>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          defaultValue={data?.username}
          autoComplete="off"
        />
      </FormField>
      <FormField>
        <label htmlFor="hash">Hash</label>
        <input id="hash" type="text" defaultValue={data?.hash} />
      </FormField>
      <FormField>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          defaultValue={data?.email}
          autoComplete="off"
        />
      </FormField>
    </Form>
  );
};

export const Zoom = () => {
  const [index, setIndex] = useState(-1);
  const { data, dataLastUpdate, isPending, refetch } = useQuery<UserModel[]>(
    '/users',
    {
      delay: 1000,
    }
  );

  if (isPending) {
    return (
      <div style={{ padding: '16px' }}>
        <span>Loading data...</span>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      {index > -1 && (
        <Modal open={true} onClose={() => setIndex(-1)}>
          <Entity id={index} />
        </Modal>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <button onClick={refetch}>Refresh</button>
        <span>Last update: {dataLastUpdate.toString()}</span>
      </div>

      <Table
        data={{
          headers: ['ID', 'Username', 'Hash', 'Email'],
          rows: data!.map((row) => ({
            ...row,
            id: (
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIndex(row['id']);
                }}
              >
                {row['id']}
              </a>
            ),
          })),
        }}
      />
    </div>
  );
};

export default {
  Entity,
  Zoom,
};
