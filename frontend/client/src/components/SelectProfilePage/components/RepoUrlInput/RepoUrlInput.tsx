import {memo, useCallback, useRef} from 'react';
import cn from 'classnames';
import assertNotEmpty from '../../../../utils/assertNotEmpty';
import classes from './RepoUrlInput.module.css';

interface Props {
  className?: string;
  onUrlSelected: (url: string) => void;
}

function RepoUrlInput(props: Props) {
  const urlInputRef = useRef<HTMLInputElement>(null);

  const onPostButtonClick = useCallback(() => {
    assertNotEmpty(urlInputRef.current);
    props.onUrlSelected(urlInputRef.current.value);
  }, []);

  return (
    <span className={cn(props.className, classes.root)}>
      <input className={classes.input} ref={urlInputRef} />
      <button onClick={onPostButtonClick}>POST</button>
    </span>
  );
}

export default memo(RepoUrlInput);
