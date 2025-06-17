import { createRef, useEffect, useState } from 'react';
import { styled, Table, Modal, Button, Icon, Loader } from '@ui';
import useQuery from '@/utils/useQuery';
import { Entity, type UserEntityProps } from './Entity';
import type UserModel from './model';
import classes from './zoomClasses';

const ZoomLoader = styled.div({
  padding: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ZoomRoot = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  padding: '16px',

  [`.${classes.toolbar}`]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',

    [`.${classes.toolbarTitle}`]: {
      display: 'inline-block',
      width: '50%',
      flex: '1 0 50%',
      fontSize: '24px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },

  [`.${classes.table}`]: {
    marginLeft: '-8px',
    marginRight: '-8px',
  },

  [`.${classes.lastUpdate}`]: {
    fontSize: '14px',
  },
});

export const Zoom = () => {
  const [entity, setEntity] = useState<UserEntityProps>();
  const { data, dataUpdatedAt, isPending, refetch } = useQuery<UserModel[]>(
    '/users',
    {
      delay: 5000,
      placeholder: [],
    }
  );

  const [rootHeight, setRootHeight] = useState<number | undefined>();
  const rootRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (rootRef.current) {
      setRootHeight(rootRef.current.offsetHeight);
    }
  }, [rootRef]);

  if (isPending) {
    return (
      <ZoomLoader className={classes.loader} style={{ height: rootHeight }}>
        <Loader />
      </ZoomLoader>
    );
  }

  return (
    <ZoomRoot ref={rootRef} className={classes.root}>
      {entity?.mode && (
        <Modal open={true} width="400px" onClose={() => setEntity(undefined)}>
          <Entity
            id={entity.id}
            mode={entity.mode}
            onSuccess={() => {
              setEntity(undefined);
              refetch();
            }}
          />
        </Modal>
      )}

      <div className={classes.toolbar}>
        <h1 className={classes.toolbarTitle}>Users</h1>

        <Button
          onClick={() =>
            setEntity({
              mode: 'new',
            })
          }
        >
          <Icon name="person_add" />
          New
        </Button>
        <Button style={{ width: 40, height: 40 }} onClick={refetch}>
          <Icon name="refresh" />
        </Button>
      </div>

      <Table
        className={classes.table}
        data={{
          headers: ['ID', 'Username', 'Status'],
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
            active: row['active'] ? 'Active' : 'Disabled',
          })),
        }}
      />

      <p className={classes.lastUpdate}>
        Last update: {dataUpdatedAt?.toLocaleString()}
      </p>
    </ZoomRoot>
  );
};

export default Zoom;
