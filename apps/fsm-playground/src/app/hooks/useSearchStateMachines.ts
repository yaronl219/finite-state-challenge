import { useCallback, useEffect, useState } from 'react';
import { useDebounce } from './useDebounce';
import { SavedStateMacineMinified } from '../types/saved-state-machine-minified';
import { fsmService } from '../services/fsmService';

export const useSearchStateMachines = (searchString: string) => {
  const debouncedSearchString = useDebounce(searchString, 300);

  const [isLoading, setIsLoading] = useState(false);

  const [stateMachines, setStateMachines] = useState<
    SavedStateMacineMinified[]
  >([]);

  const fetchStateMachines = useCallback(
    async (searchString: string) => {
      setIsLoading(true);
      const res = await fsmService.getFsmsBySearchString(searchString);
      setIsLoading(false);
      setStateMachines(res);
    },
    [setStateMachines]
  );

  useEffect(() => {
    fetchStateMachines(debouncedSearchString);
  }, [debouncedSearchString, fetchStateMachines]);

  return {
    stateMachines,
    isLoading
  };
};
