import PageType from './PageType';
import Profile from './Profile';
import TreeMapViewerType from './TreeMapViewerType';

export default interface AppState {
  page: PageType;
  profile?: Profile;
  viewer: TreeMapViewerType;
  error?: string;
}
