import {memo} from 'react';

import Profile from '../../models/Profile';
import TreeMapViewerType from '../../models/TreeMapViewerType';
import FoamTreeMap from './components/FoamTreeMap';
import TreeMap from './components/TreeMap';
import ViewerSelector from './components/ViewerSelector';
import classes from './ViewProfilePage.module.css';

interface Props {
  className?: string;
  profile: Profile;
  viewer: TreeMapViewerType;
  onTreeMapViewerChange: (viewer: TreeMapViewerType) => void;
  onGoBack: () => void;
}

function ViewProfilePage(props: Props) {
  let viewerElement: JSX.Element | undefined;

  switch (props.viewer) {
    case TreeMapViewerType.TreeMap:
      viewerElement = <TreeMap profile={props.profile} />;
      break;
    case TreeMapViewerType.FoamTreeMap:
      viewerElement = <FoamTreeMap profile={props.profile} />;
      break;
    default:
      throw Error('Unknown treemap viewer');
  }

  return (
    <div className={props.className}>
      <div className={classes.header}>
        <button onClick={props.onGoBack}>{'<'}</button>
        <ViewerSelector
          viewer={props.viewer}
          onChange={props.onTreeMapViewerChange}
        />
      </div>
      <div className={classes.view}>{viewerElement}</div>
    </div>
  );
}

export default memo(ViewProfilePage);
