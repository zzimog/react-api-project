import { useEffect, useState, type ChangeEvent } from 'react';
import { Flex, Button, Text } from '@/ui';
import { useFetch } from '@/utils';

type FormData = {
  id?: number;
  username: string;
  active?: boolean;
};

type FormProps = {
  id?: number;
  onSave?: () => void;
};

export const endpoint = 'http://localhost/rest/users';

export const UsersForm = (inProps: FormProps) => {
  const { id, onSave } = inProps;

  const { data, isPending } = useFetch<FormData>({
    url: `${endpoint}/${id}?sleep=2`,
    enabled: id ? true : false,
    initialData: {
      username: '',
      active: false,
    },
  });

  const [formData, setFormData] = useState<FormData>(data!);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, checked, type } = e.target;
    const isCheckbox = type == 'checkbox' || type == 'radio';

    setFormData((prev) => ({
      ...prev,
      [name]: isCheckbox ? checked : value,
    }));
  }

  async function handleFormSave() {
    delete formData.id;
    delete formData.active;

    const resp = await fetch(endpoint, {
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

    if (onSave) {
      onSave();
      return;
    }

    alert(JSON.stringify(json, null, '  '));
  }

  useEffect(() => {
    setFormData(data!);
  }, [data]);

  if (id && isPending) {
    return <b>Pending...</b>;
  }

  return (
    <Flex dir="column" align="flex-start">
      <Text as="h1">User</Text>
      <Flex dir="column">
        <label htmlFor="id">ID</label>
        <input
          type="text"
          name="id"
          id="id"
          defaultValue={formData.id}
          disabled
        />
      </Flex>
      <Flex dir="column">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          onChange={handleFormChange}
          value={formData.username}
        />
      </Flex>
      <Flex dir="column">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleFormChange}
        />
      </Flex>
      <Flex dir="column">
        <label htmlFor="confirm">Confirm</label>
        <input
          type="password"
          name="confirm"
          id="confirm"
          onChange={handleFormChange}
        />
      </Flex>
      <Flex align="center" spacing={1}>
        <input
          type="checkbox"
          name="active"
          id="active"
          onChange={handleFormChange}
          checked={formData.active}
        />
        <label htmlFor="active">Active</label>
      </Flex>

      <Button icon="save" label="Save" onClick={handleFormSave} />
    </Flex>
  );
};
