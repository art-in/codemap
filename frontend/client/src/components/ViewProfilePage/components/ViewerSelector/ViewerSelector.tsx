import TreeMapViewerType from '../../../../models/TreeMapViewerType';
import classes from './ViewerSelector.module.css';

interface Props {
  viewer: TreeMapViewerType;
  onChange: (viewer: TreeMapViewerType) => void;
}

export default function ViewerSelector(props: Props) {
  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <input
          id="FoamTreeMap"
          type="radio"
          checked={props.viewer == TreeMapViewerType.FoamTreeMap}
          onChange={() => props.onChange(TreeMapViewerType.FoamTreeMap)}
        />
        <label htmlFor="FoamTreeMap">FoamTreeMap</label>
      </div>
      <div className={classes.item}>
        <input
          id="TreeMap"
          type="radio"
          checked={props.viewer == TreeMapViewerType.TreeMap}
          onChange={() => props.onChange(TreeMapViewerType.TreeMap)}
        />
        <label htmlFor="TreeMap">TreeMap</label>
      </div>
    </div>
  );
}
