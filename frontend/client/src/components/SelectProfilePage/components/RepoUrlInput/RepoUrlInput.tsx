import cn from 'classnames';
import {KeyboardEvent, memo, useCallback, useRef, useState} from 'react';

import assertNotEmpty from '../../../../utils/assertNotEmpty';
import classes from './RepoUrlInput.module.css';

interface Props {
  className?: string;
  onUrlSelected: (url: string) => void;
}

function RepoUrlInput(props: Props) {
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [isInputValid, setIsInputValid] = useState(true);

  const post = useCallback(() => {
    assertNotEmpty(urlInputRef.current);
    if (!urlInputRef.current.validity.valid) {
      setIsInputValid(false);
    } else {
      props.onUrlSelected(urlInputRef.current.value);
    }
  }, [props]);

  const onInputKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code == 'Enter') {
        post();
      }
    },
    [post]
  );

  return (
    <span className={cn(props.className, classes.root)}>
      <input
        className={cn(classes.input, {[classes.invalid]: !isInputValid})}
        ref={urlInputRef}
        placeholder="Git repository URL"
        type="url"
        required
        onKeyDown={onInputKeyDown}
      />
      <button onClick={post}>POST</button>
    </span>
  );
}

export default memo(RepoUrlInput);
