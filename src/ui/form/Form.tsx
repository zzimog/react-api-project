import type { FormHTMLAttributes } from 'react';
import styled from '../styled';
import FormField from './FormField';
import FormHeader from './FormHeader';
import FormDivider from './FormDivider';
import FormActions from './FormActions';

const FormRoot = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export type FormProps = FormHTMLAttributes<HTMLFormElement>;

export const Form = (props: FormProps) => {
  const { children, ...rest } = props;

  return <FormRoot {...rest}>{children}</FormRoot>;
};

Form.Field = FormField;
Form.Header = FormHeader;
Form.Divider = FormDivider;
Form.Actions = FormActions;

export default Form;
