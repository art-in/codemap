import ViewMode from '../../models/ViewMode';
import classes from './ViewModeSelector.module.css';

interface Props {
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
}

export default function ViewModeSelector(props: Props) {
  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <input
          id="TreeMap"
          type="radio"
          checked={props.viewMode == ViewMode.TreeMap}
          onChange={() => props.onViewModeChange(ViewMode.TreeMap)}
        />
        <label htmlFor="TreeMap">TreeMap</label>
      </div>
      <div className={classes.item}>
        <input
          id="FoamTreeMap"
          type="radio"
          checked={props.viewMode == ViewMode.FoamTreeMap}
          onChange={() => props.onViewModeChange(ViewMode.FoamTreeMap)}
        />
        <label htmlFor="FoamTreeMap">FoamTreeMap</label>
      </div>
    </div>
  );
}
