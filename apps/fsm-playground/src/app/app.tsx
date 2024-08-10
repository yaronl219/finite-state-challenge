import styled from 'styled-components';
import { StateMachineContainer } from './components/state-machine-container/StateMachineContainer';
import { AppBar } from './components/app-bar/AppBar';
import { fsmService } from './services/fsmService';
import { useEffect } from 'react';

const StyledApp = styled.div`
  width: 100%;
`;

export function App() {
  useEffect(() => {
    fsmService.getFsmsBySearchString('c').then(console.log)
  }, [])
  
  return (
    <StyledApp>
      <AppBar />
      <StateMachineContainer />
    </StyledApp>
  );
}

export default App;
