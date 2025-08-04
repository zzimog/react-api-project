import { useState } from 'react';
import { type TableRow, Flex, Table, Button, Modal } from './ui';
import { useFetch } from './utils/useFetch';
import { UsersForm } from './UsersForm';

const endpoint = 'http://localhost/rest/users';

type FormState = {
  id?: number;
  mode: 'new' | 'view' | 'edit';
  open: boolean;
};

export const UsersZoom = () => {
  const {
    data,
    dataUpdatedAt,
    error,
    //errorUpdatedAt,
    isPending,
    isError,
    refetch,
  } = useFetch<TableRow[]>({ url: endpoint + '?sleep=1' });

  const [formState, setFormState] = useState<FormState>();

  function handleNew() {
    setFormState({
      mode: 'new',
      open: true,
    });
  }

  function handleModalClose() {
    setFormState({
      mode: 'new',
      open: false,
    });
  }

  function handleFormSave() {
    setFormState({
      mode: 'new',
      open: false,
    });

    refetch();
  }

  const title = 'Users';
  const zoom = {
    headers: ['id', 'username', 'active'],
    rows: data,
    actions: [
      {
        icon: 'edit',
        label: 'edit',
        action: async ({ id }: TableRow) => {
          setFormState({
            id: id as number,
            mode: 'edit',
            open: true,
          });
        },
      },
      {
        icon: 'delete',
        label: 'delete',
        action: async ({ id }: TableRow) => {
          if (!confirm('Are you sure?')) {
            return;
          }

          const url = endpoint + '/' + id;
          const resp = await fetch(url, { method: 'delete' });
          const json = await resp.json();

          alert(JSON.stringify(json, null, '  '));
          refetch();
        },
      },
    ],
  };

  if (isPending) {
    return <b>Pending...</b>;
  }

  if (isError) {
    return <b>Error: {JSON.stringify(error, null, '  ')}</b>;
  }

  return (
    <>
      {formState?.open && (
        <Modal open={formState.open} onClose={handleModalClose}>
          <UsersForm id={formState.id} onSave={handleFormSave} />
        </Modal>
      )}

      <Flex dir="column" gap={8}>
        <Flex justify="space-between" align="center" gap={8}>
          <h1>{title}</h1>
          <Button icon="add" label="New" onClick={handleNew} />
        </Flex>

        <Table {...zoom} />

        <Flex align="center" gap={8}>
          <Button icon="refresh" onClick={refetch} />

          <span>
            Updated at: <b>{dataUpdatedAt?.toLocaleString()}</b>
          </span>
        </Flex>
      </Flex>
    </>
  );
};
