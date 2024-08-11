
import styled from 'styled-components';
import { StatePlayerContainer } from '../state-player/StatePlayerContainer';
import { StateMachineMap } from './StateMachineMap';
import { StateMachineProvider } from '../../context/active-state-context/StateMachineProvider';
import { SavedStateMachineContainer } from '../saved-state-machines/SavedStateMachineContainer';

export const StateMachineContainer = () => {
  return (
    <StyledContainer>
      <StateMachineProvider>
        <SavedStateMachineContainer />
        <StatePlayerContainer
        />
        
        <StateMachineMap
        />
      </StateMachineProvider>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr 1fr;
  height: calc(100vh - 4rem)
`;
