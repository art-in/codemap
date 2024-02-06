import {ChangeEvent, useCallback, useRef} from 'react';
import classes from './ProfileFileInput.module.css';

interface Props {
  className?: string;
  onFileSelected: (content: string) => void;
}

export default function ProfileFileInput(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const file = input.files && input.files[0];

      if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          const contents = reader.result as string;
          props.onFileSelected(contents);
        });
        reader.readAsText(file, 'UTF-8');
      }
    },
    [props.onFileSelected]
  );

  const onButtonClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return (
    <div className={classes.root}>
      <button onClick={onButtonClick}>
        Choose profile file from local disk
      </button>
      <input ref={inputRef} type="file" onChange={onChange} />
    </div>
  );
}
