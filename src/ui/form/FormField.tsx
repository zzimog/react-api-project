import {
  useId,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from 'react';
import styled from '../styled';

export type FormFieldProps = {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number;
  props?: InputHTMLAttributes<HTMLInputElement>;
};

const FormFieldRoot = styled.div({
  width: '100%',

  ['label']: {
    display: 'block',
    padding: '0 4px',
    marginBottom: '4px',
  },

  ['input']: {
    padding: '8px',
    border: '1px solid gray',
    borderRadius: '4px',
  },
});

export const FormField = (props: FormFieldProps) => {
  const { name, label, type = 'text', value, props: inputProps } = props;
  const id = useId() + name;

  return (
    <FormFieldRoot>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        {...inputProps}
      />
    </FormFieldRoot>
  );
};

export default FormField;
