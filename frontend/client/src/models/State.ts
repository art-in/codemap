import Profile from './Profile';
import TreeMapViewer from './TreeMapViewer';

export default interface State {
  profile?: Profile;
  viewer: TreeMapViewer;
}
