import {
  useId,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
} from 'react';
import clsx from 'clsx';
import styled from '../styled';

export type FormFieldProps = {
  name: string;
  label: string;
  help?: string;
  type?: HTMLInputTypeAttribute;
  value?: string | number | boolean;
  required?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const FormFieldRoot = styled.div({
  width: '100%',
  padding: '0 16px',

  [`label`]: {
    display: 'block',
    padding: '0 4px',
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: 600,

    [`&.required::after`]: {
      content: '"*"',
      color: 'red',
      marginLeft: '4px',
      fontWeight: 400,
    },
  },

  [`input`]: {
    width: '100%',
    padding: '8px 16px',
    fontSize: '14px',
    border: '1px solid #e0e6eb',
    borderRadius: '4px',
    background: '#fff',
    transitionProperty: 'border-color, outline',
    outline: '3px solid transparent',

    [`&:not(:disabled):hover`]: {
      outlineColor: '#f4f7fb',
    },

    [`&:focus`]: {
      borderColor: 'var(--color-primary)',
      outline: '3px solid #f4f7fb',
    },

    [`&:disabled`]: {
      color: '#aaa',
      background: '#eee',
      borderColor: '#ddd',
    },

    [`&::placeholder`]: {
      color: '#98a4ae',
    },
  },

  [`p`]: {
    padding: '0 4px',
    fontSize: '12px',
    color: '#98a4ae',
  },
});

export const FormField = (props: FormFieldProps) => {
  const { name, label, help, type = 'text', required, ...inputProps } = props;
  const id = useId() + name;

  return (
    <FormFieldRoot>
      <label
        htmlFor={id}
        className={clsx({
          required,
        })}
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        {...inputProps}
      />
      {help && <p>{help}</p>}
    </FormFieldRoot>
  );
};

export default FormField;
