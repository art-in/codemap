import TreeMapViewer from '../../../../models/TreeMapViewer';
import classes from './ViewerSelector.module.css';

interface Props {
  viewer: TreeMapViewer;
  onChange: (viewer: TreeMapViewer) => void;
}

export default function ViewerSelector(props: Props) {
  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <input
          id="FoamTreeMap"
          type="radio"
          checked={props.viewer == TreeMapViewer.FoamTreeMap}
          onChange={() => props.onChange(TreeMapViewer.FoamTreeMap)}
        />
        <label htmlFor="FoamTreeMap">FoamTreeMap</label>
      </div>
      <div className={classes.item}>
        <input
          id="TreeMap"
          type="radio"
          checked={props.viewer == TreeMapViewer.TreeMap}
          onChange={() => props.onChange(TreeMapViewer.TreeMap)}
        />
        <label htmlFor="TreeMap">TreeMap</label>
      </div>
    </div>
  );
}
