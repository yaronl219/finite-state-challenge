import { useCallback, useEffect, useState } from 'react';
import { userService } from '../../services/userService';
import { Avatar, CircularProgress, Typography } from '@mui/material';
import styled from 'styled-components';
import { useUiContext } from '../../context/ui-context/UiContext';

export const UserAvatar = () => {
  const [user, setUser] = useState<null | {
    name: { first: string };
    picture: { medium: string };
  }>(null);

  const { setIsToastDisplayed } = useUiContext();

  const fetchAndSetUser = useCallback(async () => {
    try {
      const { results } = await userService.getUser();
      setUser(results[0]);
    } catch (err) {
      setIsToastDisplayed(true);
      console.error('Failed to get user', err);
    }
  }, [setIsToastDisplayed]);

  useEffect(() => {
    fetchAndSetUser();
  }, [fetchAndSetUser]);

  return (
    <Container>
      {user ? (
        <AvatarContainer>
          <Typography>Hello {user.name.first} </Typography>
          <Avatar alt={user.name.first} src={user.picture.medium} />
        </AvatarContainer>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
`;
const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
`;
