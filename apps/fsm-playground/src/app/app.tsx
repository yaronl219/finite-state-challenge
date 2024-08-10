import styled from 'styled-components';
import { StateMachineContainer } from './components/state-machine-container/StateMachineContainer';
import { AppBar } from './components/app-bar/AppBar';

const StyledApp = styled.div`
  width: 100%;
`;

export function App() {
  return (
    <StyledApp>
      <AppBar />
      <StateMachineContainer />
    </StyledApp>
  );
}

export default App;
