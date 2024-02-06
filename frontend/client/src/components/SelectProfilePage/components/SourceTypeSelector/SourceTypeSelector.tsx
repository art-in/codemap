import {memo} from 'react';
import ProfileSourceType from '../../../../models/ProfileSourceType';
import classes from './SourceTypeSelector.module.css';

const sourceTypes = [
  {type: ProfileSourceType.RepoUrl, label: 'Repository URL'},
  {type: ProfileSourceType.ProfileFile, label: 'Profile'},
];

interface Props {
  type: ProfileSourceType;
  onChange: (type: ProfileSourceType) => void;
}

function SourceTypeSelector(props: Props) {
  return (
    <div className={classes.root}>
      {sourceTypes.map(({type, label}) => {
        return (
          <div key={type} className={classes.type}>
            <input
              type="radio"
              id={`type-${type}`}
              checked={props.type === type}
              onChange={() => props.onChange(type)}
            />
            <label htmlFor={`type-${type}`}>{label}</label>
          </div>
        );
      })}
    </div>
  );
}

export default memo(SourceTypeSelector);
