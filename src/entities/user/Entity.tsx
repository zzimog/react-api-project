import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { Form, Button, Loader } from '@ui';
import useQuery from '@/utils/useQuery';
import useFetch from '@/utils/useFetch';
import capitalize from '@/utils/capitalize';
import type UserModel from './model';

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

  /*
  <Form.Field
    name="email"
    label="Email"
    type="email"
    value={formData['email'] as string}
    autoComplete="off"
    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"
    placeholder="ipsum@dolor.sit"
    {...formFieldProps}
  />
  */

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Header title={`${capitalize(mode)} user`} />

      {id && <Form.Field name="id" label="ID" defaultValue={id} disabled />}
      <Form.Field
        name="username"
        label="Username"
        defaultValue={data?.username || ''}
        autoComplete="off"
        required={mode === 'new'}
        {...formFieldProps}
      />
      <Form.Field
        name="password"
        label="Password"
        help="Must be at least 8 characters"
        type="password"
        autoComplete="new-password"
        required={mode === 'new'}
        {...formFieldProps}
      />
      <Form.Field
        name="password_confirm"
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        required={mode === 'new'}
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

export default Entity;
