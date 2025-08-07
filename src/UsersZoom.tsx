import { useState } from 'react';
import { type TableRow, Flex, Table, Button, Modal, Text, Loader } from '@/ui';
import { useFetch } from '@/utils';
import { UsersForm } from '@/UsersForm';

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
    handleModalClose();
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
    return <Loader />;
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

      <Flex dir="column">
        <Flex justify="space-between" align="center">
          <Text as="h1" style={{ flexGrow: 1 }}>
            {title}
          </Text>
          <Button icon="add" label="New" onClick={handleNew} />
          <Button icon="refresh" onClick={refetch} />
        </Flex>

        <Table {...zoom} />

        <Text size="sm">
          Updated at: <b>{dataUpdatedAt?.toLocaleString()}</b>
        </Text>
      </Flex>
    </>
  );
};
