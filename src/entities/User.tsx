import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Table, Modal, Button, Icon, Loader } from '@ui';
import useQuery from '@/utils/useQuery';
import Form from '@/ui/form/Form';
import useFetch from '@/utils/useFetch';
import capitalize from '@/utils/capitalize';

export type UserModel = {
  id: number;
  username: string;
  hash: string;
  email: string;
};

export type UserEntityProps = {
  id?: string | number;
  mode?: 'new' | 'view' | 'edit';
  onSuccess?: () => void;
  onError?: () => void;
};

export const Entity = (props: UserEntityProps) => {
  const { id, mode: initMode, onSuccess, onError } = props;
  const [mode, setMode] = useState(initMode || (id ? 'view' : 'new'));

  const { data, isIdle, isPending } = useQuery<UserModel>(`/users/${id}`, {
    delay: 1000,
    enabled: !!id,
  });

  const api = useFetch({
    url: 'users' + (id ? `/${id}` : ''),
    onSuccess,
    onError: (err) => {
      alert(err);

      if (onError) {
        onError();
      }
    },
  });

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!Object.keys(formData).length) {
      return;
    }

    if (mode === 'edit') {
      api.patch(formData);
    } else if (mode === 'new') {
      api.put(formData);
    }
  }

  function handleDelete() {
    api.delete();
  }

  if ((id && isIdle) || isPending) {
    return <Loader />;
  }

  const formData: Record<string, string | number | boolean> = {};
  const formFieldProps = {
    disabled: mode === 'view',
    onChange(evt: ChangeEvent<HTMLInputElement>) {
      const { name, value } = evt.target;
      formData[name] = value;
    },
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Header title={`${capitalize(mode)} user`} />

      {id && <Form.Field name="id" label="ID" defaultValue={id} disabled />}
      <Form.Field
        name="username"
        label="Username"
        defaultValue={data?.username || ''}
        autoComplete="off"
        required
        {...formFieldProps}
      />
      <Form.Field
        name="password"
        label="Password"
        help="Must be at least 8 characters"
        type="password"
        autoComplete="new-password"
        required
        {...formFieldProps}
      />
      <Form.Field
        name="passwordConfirm"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        required
        {...formFieldProps}
      />
      <Form.Field
        name="email"
        label="Email"
        type="email"
        defaultValue={data?.email || ''}
        autoComplete="off"
        pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"
        placeholder="ipsum@dolor.sit"
        {...formFieldProps}
      />

      <Form.Actions>
        {mode === 'edit' && (
          <Button
            type="button"
            style={{ marginRight: 'auto' }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}

        {mode === 'new' || mode === 'edit' ? (
          <Button type="submit">Save</Button>
        ) : (
          <Button type="button" onClick={() => setMode('edit')}>
            Edit
          </Button>
        )}
      </Form.Actions>
    </Form>
  );
};

export const Zoom = () => {
  const [entity, setEntity] = useState<UserEntityProps>();

  const { data, dataUpdatedAt, isPending, refetch } = useQuery<UserModel[]>(
    '/users',
    {
      delay: 1000,
      placeholder: [],
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
        <Modal open={true} width="400px" onClose={() => setEntity(undefined)}>
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

      <span>Last update: {dataUpdatedAt?.toLocaleString()}</span>
    </div>
  );
};

export default {
  Entity,
  Zoom,
};
