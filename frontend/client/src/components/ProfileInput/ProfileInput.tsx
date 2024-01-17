import {ChangeEvent, useCallback} from 'react';
import classes from './ProfileInput.module.css';

interface Props {
  onProfileSelected: (contents: string) => void;
}

export default function ProfileInput(props: Props) {
  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const file = input.files && input.files[0];

      if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const contents = reader.result as string;
          props.onProfileSelected(contents);
        });
        reader.readAsText(file, 'UTF-8');
      }
    },
    [props.onProfileSelected]
  );

  return (
    <div className={classes.root}>
      <label htmlFor="file">Profile:</label>
      <input id="file" type="file" accept=".json" onChange={onChange} />
    </div>
  );
}
