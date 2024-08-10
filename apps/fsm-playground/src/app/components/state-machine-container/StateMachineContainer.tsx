
import styled from 'styled-components';
import { StatePlayerContainer } from '../state-player/StatePlayerContainer';
import { RightPane } from './RightPane';
import { StateMachineProvider } from '../../context/active-state-context/StateMachineProvider';

export const StateMachineContainer = () => {
  return (
    <StyledContainer>
      <StateMachineProvider>
        <StatePlayerContainer
        />
        <VerticalBreak />
        <RightPane
        />
      </StateMachineProvider>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  height: calc(100vh - 4rem)
`;

const VerticalBreak = styled.div`
  background-color: black;
`