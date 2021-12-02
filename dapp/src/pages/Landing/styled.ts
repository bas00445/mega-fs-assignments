import styled from "styled-components";

export const Clock = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  background: gray;
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

interface StyleProps {
  $deg: number;
}

export const SecondLine = styled.div<StyleProps>`
  width: 300px;
  height: 1px;
  background: red;
  position: absolute;
  right: calc(50% - 150px);
  top: 50%;
  transform: translate(50%, -50%) ${({ $deg }) => `rotate(${$deg}deg)`};
  transform-origin: top left;
`;

export const MinuteLine = styled.div<StyleProps>`
  width: 200px;
  height: 3px;
  background: black;
  position: absolute;
  right: calc(50% - 100px);
  top: 50%;
  transform: translate(50%, -50%) ${({ $deg }) => `rotate(${$deg}deg)`};
  transform-origin: top left;
`;

export const HourLine = styled.div<StyleProps>`
  width: 100px;
  height: 3px;
  background: black;
  position: absolute;
  right: calc(50% - 50px);
  top: 50%;
  transform: translate(50%, -50%) ${({ $deg }) => `rotate(${$deg}deg)`};
  transform-origin: top left;
`;
