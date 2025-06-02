import { useState } from 'react';
import { styled, Table, Modal, Button, Icon, Loader } from '@ui';
import useQuery from '@/utils/useQuery';
import FormField from '@/ui/form/FormField';

const Form = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
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
    delay: 3000,
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <Form>
      <FormField name="id" label="ID" value={id} props={{ disabled: true }} />
      <FormField
        name="username"
        label="Username"
        value={data?.username}
        props={{ autoComplete: 'off' }}
      />
      <FormField name="hash" label="Hash" value={data?.hash} />
      <FormField
        name="email"
        label="Email"
        value={data?.email}
        props={{ autoComplete: 'off' }}
      />
    </Form>
  );
};

export const Zoom = () => {
  const [index, setIndex] = useState(-1);
  const { data, dataLastUpdate, isPending, refetch } = useQuery<UserModel[]>(
    '/users',
    {
      delay: 3000,
    }
  );

  if (isPending) {
    return (
      <div style={{ padding: '32px' }}>
        <Loader />
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
        <Button onClick={refetch}>
          <Icon name="refresh" />
          Refresh
        </Button>

        <Button
          style={{ marginLeft: 'auto' }}
          onClick={() => alert('to be implemented')}
        >
          <Icon name="person_add" />
          New
        </Button>
      </div>

      <Table
        style={{ marginBottom: '8px' }}
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

      <span>Last update: {dataLastUpdate.toLocaleString()}</span>
    </div>
  );
};

export default {
  Entity,
  Zoom,
};
