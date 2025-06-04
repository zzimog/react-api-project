import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { styled, Table, Modal, Button, Icon, Loader } from '@ui';
import useQuery from '@/utils/useQuery';
import FormField from '@/ui/form/FormField';

const Form = styled.form({
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

export type UserEntityProps = {
  id?: number;
  mode: 'new' | 'view' | 'edit';
};

export const Entity = (props: UserEntityProps) => {
  const { id, mode: initMode } = props;
  const [mode, setMode] = useState(initMode);
  const { data, isPending } = useQuery<UserModel>(`/users/${id}`, {
    delay: 0,
  });

  const formData: Record<string, string | number | boolean> = {};

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    fetch(`http://localhost/api/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((json) => console.log(json))
      .catch((err) => alert(err));
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    formData[name] = value;
  }

  if (isPending) {
    return <Loader />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormField name="mode" label="Mode" value={mode} disabled />
      <FormField name="id" label="ID" value={id} disabled />
      <FormField
        name="username"
        label="Username"
        defaultValue={data?.username || ''}
        autoComplete="off"
        disabled={mode === 'view'}
        onChange={handleChange}
      />
      <FormField
        name="hash"
        label="Hash"
        defaultValue={data?.hash || ''}
        disabled={mode === 'view'}
        onChange={handleChange}
      />
      <FormField
        name="email"
        label="Email"
        defaultValue={data?.email || ''}
        autoComplete="off"
        disabled={mode === 'view'}
        onChange={handleChange}
      />
      <Button type="submit">Save</Button>
      <Button type="button" onClick={() => setMode('edit')}>
        Edit
      </Button>
    </Form>
  );
};

export const Zoom = () => {
  const [entity, setEntity] = useState<UserEntityProps | null>(null);

  const { data, dataLastUpdate, isPending, refetch } = useQuery<UserModel[]>(
    '/users',
    {
      delay: 0,
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
      {entity?.mode && (
        <Modal open={true} onClose={() => setEntity(null)}>
          <Entity id={entity.id} mode={entity.mode} />
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
          onClick={() =>
            setEntity({
              mode: 'new',
            })
          }
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
                  setEntity({
                    id: row['id'],
                    mode: 'view',
                  });
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
