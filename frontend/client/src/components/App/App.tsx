import {useCallback, useState} from 'react';
import Profile from '../../models/Profile';
import State from '../../models/State';
import TreeMapViewer from '../../models/TreeMapViewer';
import classes from './App.module.css';
import SelectProfilePage from '../SelectProfilePage/SelectProfilePage';
import ViewProfilePage from '../ViewProfilePage/ViewProfilePage';

function App() {
  const [state, setState] = useState<State>({
    viewer: TreeMapViewer.FoamTreeMap,
  });

  const onViewerChange = useCallback(
    (viewer: TreeMapViewer) => {
      setState({
        ...state,
        viewer,
      });
    },
    [state]
  );

  const onProfileFileSelected = useCallback(
    (contents: string) => {
      // TODO: validate profile format
      const profile = contents ? (JSON.parse(contents) as Profile) : undefined;
      setState({...state, profile});
    },
    [state]
  );

  const onRepoUrlSelected = useCallback(async (repoUrl: string) => {
    const response = await fetch(`api/loc-profile?git-repo-url=${repoUrl}`);
    const profile = await response.json();
    setState({
      ...state,
      profile,
    });
  }, []);

  const onProfileViewPageGoBack = useCallback(() => {
    setState({
      ...state,
      profile: undefined,
    });
  }, []);

  return (
    <>
      {!state.profile && (
        <SelectProfilePage
          className={classes.root}
          onProfileFileSelected={onProfileFileSelected}
          onRepoUrlSelected={onRepoUrlSelected}
        />
      )}

      {state.profile && (
        <ViewProfilePage
          className={classes.root}
          profile={state.profile}
          viewer={state.viewer}
          onViewerChange={onViewerChange}
          onGoBack={onProfileViewPageGoBack}
        />
      )}
    </>
  );
}

export default App;
