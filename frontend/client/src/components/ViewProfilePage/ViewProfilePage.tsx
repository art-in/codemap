import {memo} from 'react';
import classes from './ViewProfilePage.module.css';
import Profile from '../../models/Profile';
import TreeMapViewer from '../../models/TreeMapViewer';
import TreeMap from './components/TreeMap';
import FoamTreeMap from './components/FoamTreeMap';
import ViewerSelector from './components/ViewerSelector';

interface Props {
  className?: string;
  profile: Profile;
  viewer: TreeMapViewer;
  onViewerChange: (viewer: TreeMapViewer) => void;
  onGoBack: () => void;
}

function ViewProfilePage(props: Props) {
  let viewerElement: JSX.Element | undefined;

  if (props.profile) {
    switch (props.viewer) {
      case TreeMapViewer.TreeMap:
        viewerElement = <TreeMap profile={props.profile} />;
        break;
      case TreeMapViewer.FoamTreeMap:
        viewerElement = <FoamTreeMap profile={props.profile} />;
        break;
      default:
        throw Error('Unknown treemap viewer');
    }
  }

  return (
    <div className={props.className}>
      <div className={classes.header}>
        <button onClick={props.onGoBack}>{'<'}</button>
        <ViewerSelector viewer={props.viewer} onChange={props.onViewerChange} />
      </div>
      <div className={classes.view}>{viewerElement}</div>
    </div>
  );
}

export default memo(ViewProfilePage);
