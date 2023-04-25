import styled from "@emotion/styled";

interface props {
  textAlign?: string;
}

const ButtonStyled = styled.button<props>`
  padding: 5px;
  background-color: #176ac9;
  font-size: 14px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: white;
  }
`;

interface Props {
  text: string;
  onClick: () => void;
}

export const Button = ({ text, onClick }: Props) => {
  return <ButtonStyled onClick={onClick}>{text}</ButtonStyled>;
};
