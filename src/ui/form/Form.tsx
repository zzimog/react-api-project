import type { PropsWithChildren } from 'react';
//import styled from './styled';

export type FormProps = PropsWithChildren;

export const Form = (props: FormProps) => {
  const { children } = props;

  return <div>{children}</div>;
};

export default Form;
