import styled from '../styled';

export type FormHeaderProps = {
  title?: string;
};

const FormHeaderRoot = styled.div({
  padding: '16px',
  //background: '#f4f7fb',
  //borderBottom: '1px solid #e0e6eb',

  [`h1`]: {
    padding: '0 4px',
    fontSize: '18px',
    fontWeight: 600,
  },
});

export const FormHeader = (props: FormHeaderProps) => {
  const { title } = props;

  return (
    <FormHeaderRoot>
      <h1>{title}</h1>
    </FormHeaderRoot>
  );
};

export default FormHeader;
