import {useCallback, useState} from 'react';

import AppState from '../../models/AppState';
import PageType from '../../models/PageType';
import Profile from '../../models/Profile';
import TreeMapViewerType from '../../models/TreeMapViewerType';
import assertNotEmpty from '../../utils/assertNotEmpty';
import ErrorPage from '../ErrorPage';
import LoadingPage from '../LoadingPage';
import SelectProfilePage from '../SelectProfilePage/SelectProfilePage';
import ViewProfilePage from '../ViewProfilePage/ViewProfilePage';
import classes from './App.module.css';

function App() {
  const [state, setState] = useState<AppState>({
    page: PageType.SelectProfile,
    viewer: TreeMapViewerType.FoamTreeMap,
  });

  const onProfileJsonProvided = useCallback(
    (profileJson: string) => {
      try {
        // TODO: validate profile format
        const profile = JSON.parse(profileJson) as Profile;
        setState({
          ...state,
          page: PageType.ViewProfile,
          profile,
        });
      } catch (e) {
        console.error(e);
        setState({
          ...state,
          page: PageType.Error,
          error: 'Failed to parse profile',
        });
      }
    },
    [state]
  );

  const onRepoUrlSelected = useCallback(
    async (repoUrl: string) => {
      setState({...state, page: PageType.Loading});
      const response = await fetch(`api/loc-profile?git-repo-url=${repoUrl}`);
      const responseText = await response.text();
      if (response.status === 200) {
        onProfileJsonProvided(responseText);
      } else {
        setState({
          ...state,
          page: PageType.Error,
          error: 'Failed to get repo profile',
        });
      }
    },
    [state, onProfileJsonProvided]
  );

  const onProfileFileSelected = useCallback(
    (fileContents: string) => {
      setState({...state, page: PageType.Loading});
      // move profile parsing to separate js task so loading-page can render
      setTimeout(() => {
        onProfileJsonProvided(fileContents);
      });
    },
    [state, onProfileJsonProvided]
  );

  const onTreeMapViewerChange = useCallback(
    (viewer: TreeMapViewerType) => {
      setState({
        ...state,
        viewer,
      });
    },
    [state]
  );

  const onViewProfilePageGoBack = useCallback(() => {
    setState({
      ...state,
      page: PageType.SelectProfile,
      profile: undefined,
    });
  }, [state]);

  switch (state.page) {
    case PageType.SelectProfile:
      return (
        <SelectProfilePage
          className={classes.root}
          onProfileFileSelected={onProfileFileSelected}
          onRepoUrlSelected={onRepoUrlSelected}
        />
      );

    case PageType.ViewProfile:
      assertNotEmpty(state.profile);
      return (
        <ViewProfilePage
          className={classes.root}
          onGoBack={onViewProfilePageGoBack}
          onTreeMapViewerChange={onTreeMapViewerChange}
          profile={state.profile}
          viewer={state.viewer}
        />
      );

    case PageType.Loading:
      return <LoadingPage className={classes.root} />;

    case PageType.Error:
      assertNotEmpty(state.error);
      return <ErrorPage className={classes.root} error={state.error} />;

    default:
      throw Error('Unknown page type');
  }
}

export default App;
