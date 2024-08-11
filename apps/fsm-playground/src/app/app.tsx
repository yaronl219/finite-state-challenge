import styled from 'styled-components';
import { StateMachineContainer } from './components/state-machine-container/StateMachineContainer';
import { AppBar } from './components/app-bar/AppBar';
import { UiContextProvider } from './context/ui-context/UiContextProvider';
import { Toast } from './components/design-components/Toast';


const StyledApp = styled.div`
  width: 100%;
`;

export function App() {
  return (
    <StyledApp>
      <UiContextProvider>
        <AppBar />
        <StateMachineContainer />
        <Toast />
      </UiContextProvider>
    </StyledApp>
  );
}

export default App;
