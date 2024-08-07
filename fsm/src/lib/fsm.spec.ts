import { Fsm } from './fsm';
import { StateNode } from './types/types';

describe('Finite state machine tests', () => {
  describe('Happy flow tests', () => {
    describe('advancing steps tests', () => {
      it('Should alternate between states', () => {
        const stateNodes: StateNode[] = [
          {
            id: '1',
            name: 'a',
            nextStateIds: ['2'],
          },
          {
            id: '2',
            name: 'b',
            nextStateIds: ['1'],
          },
        ];

        const fsm = new Fsm({
          stateNodes,
          resolveInitialState: () => stateNodes[0],
        });

        expect(fsm.getCurrentState()).toEqual(stateNodes[0]);
        fsm.advance();
        expect(fsm.getCurrentState()).toEqual(stateNodes[1]);
        fsm.advance();
        expect(fsm.getCurrentState()).toEqual(stateNodes[0]);
      });

      it('Should run until state is complete', () => {
        const stateNodes: StateNode[] = [
          {
            id: '1',
            name: 'a',
            nextStateIds: ['2'],
          },
          {
            id: '2',
            name: 'b',
            nextStateIds: ['3'],
          },
          {
            id: '3',
            name: 'C',
          },
        ];

        const fsm = new Fsm({
          stateNodes,
          resolveInitialState: () => stateNodes[0],
        });

        expect(fsm.getCurrentState()).toEqual(stateNodes[0]);
        fsm.advance();
        expect(fsm.getCurrentState()).toEqual(stateNodes[1]);
        fsm.advance();
        expect(fsm.getCurrentState()).toEqual(stateNodes[2]);
        expect(fsm.getIsNodeFinal()).toEqual(true);
      });

      it('Should advance to required step', () => {
        const stateNodes: StateNode[] = [
          {
            id: '1',
            name: 'a',
            nextStateIds: ['2', '3'],
          },
          {
            id: '2',
            name: 'b',
            nextStateIds: ['1'],
          },
          {
            id: '3',
            name: 'b',
            nextStateIds: ['1'],
          },
        ];

        const fsm = new Fsm({
          stateNodes,
          resolveInitialState: () => stateNodes[0],
        });

        expect(fsm.getCurrentState()).toEqual(stateNodes[0])
        fsm.advance('2')

        expect(fsm.getCurrentState()).toEqual(stateNodes[1])
        fsm.advance('1')

        expect(fsm.getCurrentState()).toEqual(stateNodes[0])
        fsm.advance('3')

        expect(fsm.getCurrentState()).toEqual(stateNodes[2])

      });
    });

    describe('events tests', () => {
      it('Should fire state change event', () => {
        const stateNodes: StateNode[] = [
          {
            id: '1',
            name: 'a',
            nextStateIds: ['2'],
          },
          {
            id: '2',
            name: 'b',
            nextStateIds: ['1'],
          },
        ];
        const onStateChange = jest.fn();
        const fsm = new Fsm({
          stateNodes,
          onStateChange,
          resolveInitialState: () => stateNodes[0],
        });
        fsm.advance();
        expect(onStateChange).toHaveBeenCalled();
        expect(onStateChange.mock.calls[0][0]).toEqual(stateNodes[1]);
      });

      it('Should fire on enter event', () => {
        const stateNodes = [
          {
            id: '1',
            name: 'a',
            onEnterState: jest.fn(),
            nextStateIds: ['2'],
          },
          {
            id: '2',
            name: 'b',
            onEnterState: jest.fn(),
            nextStateIds: ['1'],
          },
        ];
        const fsm = new Fsm({
          stateNodes,
          resolveInitialState: () => stateNodes[0],
        });
        fsm.advance();
        expect(stateNodes[1].onEnterState.mock.calls[0][0]).toEqual(
          stateNodes[1]
        );
      });

      it('Should fire on exit event', () => {
        const stateNodes = [
          {
            id: '1',
            name: 'a',
            onExitState: jest.fn(),
            nextStateIds: ['2'],
          },
          {
            id: '2',
            name: 'b',
            onExitState: jest.fn(),
            nextStateIds: ['1'],
          },
        ];
        const fsm = new Fsm({
          stateNodes,
          resolveInitialState: () => stateNodes[0],
        });
        fsm.advance();
        expect(stateNodes[0].onExitState.mock.calls[0][0]).toEqual(
          stateNodes[0]
        );
      });
    });
  });

  describe('Error tests', () => {
    // todo: add error
  });
});
