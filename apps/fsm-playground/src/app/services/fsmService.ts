import { StateNode } from '@fsm-challenge/fsm';
import { v4 as uuidv4 } from 'uuid';

const MOCK_KEY = 'mock-fsms';
const setUpMockMode = () => {
  const streetLightFsm: StateNode<any>[] = [
    {
      id: '1',
      name: 'red',
      nextStateIds: [{ id: '2' }],
    },
    {
      id: '2',
      name: 'red yellow',
      nextStateIds: [{ id: '3' }],
    },
    {
      id: '3',
      name: 'green',
      nextStateIds: [{ id: '4' }],
    },
    {
      id: '4',
      name: 'yellow',
      nextStateIds: [{ id: '1' }],
    },
  ];

  const dogFsm: StateNode<any>[] = [
    {
      id: '1',
      name: 'dog eating',
      nextStateIds: [{ id: '2', action: 'Feed the dog' }],
    },
    {
      id: '2',
      name: 'dog hungry',
      nextStateIds: [{ id: '1', action: 'Dog finished eating' }],
    },
  ];

  const munchkinFsm: StateNode<any>[] = [
    {
      id: '1',
      name: 'Start',
      nextStateIds: [
        { id: '2', action: 'm' },
        { id: 'error', action: 'not m' },
      ],
    },
    {
      id: '2',
      name: 'm found',
      nextStateIds: [
        { id: '3', action: 'u' },
        { id: 'error', action: 'not u' },
      ],
    },
    {
      id: '3',
      name: 'u found',
      nextStateIds: [
        { id: '4', action: 'n' },
        { id: 'error', action: 'not n' },
      ],
    },
    {
      id: '4',
      name: 'n found',
      nextStateIds: [
        { id: '5', action: 'c' },
        { id: 'error', action: 'not c' },
      ],
    },
    {
      id: '5',
      name: 'c found',
      nextStateIds: [
        { id: '6', action: 'h' },
        { id: 'error', action: 'not h' },
      ],
    },
    {
      id: '6',
      name: 'c found',
      nextStateIds: [
        { id: '7', action: 'k' },
        { id: 'error', action: 'not k' },
      ],
    },
    {
      id: '7',
      name: 'k found',
      nextStateIds: [
        { id: '8', action: 'i' },
        { id: 'error', action: 'not i' },
      ],
    },
    {
      id: '8',
      name: 'i found',
      nextStateIds: [
        { id: '9', action: 'n' },
        { id: 'error', action: 'not n' },
      ],
    },
    {
      id: '9',
      name: 'Success',
      nextStateIds: [],
    },
    {
      id: 'error',
      name: 'error',
    },
  ];

  //   const mockFsms = [streetLightFsm, dogFsm, munchkinFsm].reduce(
  //     (map, mockFsm) => ({
  //       ...map,
  //       [uuidv4()]: {
  //         name:
  //         fsm: mockFsm,
  //     }),
  //     {}
  //   );

  const mockFsms = {
    [uuidv4()]: {
      name: 'Dog feeding',
      fsm: dogFsm,
    },
    [uuidv4()]: {
      name: 'Munchkin pattern matching',
      fsm: munchkinFsm,
    },
    [uuidv4()]: {
      name: 'Street light',
      fsm: streetLightFsm,
    },
  };
  window.localStorage.setItem(MOCK_KEY, JSON.stringify(mockFsms ));
};

class FsmService {
  private isMockMode = true;

  constructor() {
    if (this.isMockMode) {
      setUpMockMode();
    }
  }

  private getMock(): Record<string, { fsm: StateNode<any>[]; name: string }> {
    const mock = window.localStorage.getItem(MOCK_KEY);
    if (!mock) return {};
    return JSON.parse(mock);
  }

  public async getFsmById(id: string): Promise<StateNode<any>[] | undefined> {
    if (this.isMockMode) {
      const mock = this.getMock();
      return Promise.resolve(mock[id]?.fsm);
    }
  }

  public async getFsmsBySearchString(
    searchString: string
  ): Promise<{ id: string; name: string }[]> {
    if (this.isMockMode) {
      const mock = this.getMock();

      const matches = Object.entries(mock)
        .filter((entry) => {
          const [_, value] = entry;
          return value.name.toLowerCase().includes(searchString.toLowerCase());
        })
        .map((entry) => {
          const [id, { name }] = entry;
          return {
            id,
            name,
          };
        });
      return Promise.resolve(matches);
    }
    return [];
  }
}

export const fsmService = new FsmService();
