import {memo, useCallback, useRef} from 'react';
import assertNotEmpty from '../../utils/assertNotEmpty';

interface Props {
  onUrlSelected: (url: string) => void;
}

function RepoUrlInput(props: Props) {
  const urlInputRef = useRef<HTMLInputElement>(null);

  const onPostButtonClick = useCallback(() => {
    assertNotEmpty(urlInputRef.current);
    props.onUrlSelected(urlInputRef.current.value);
  }, []);

  return (
    <span>
      <input type="url" ref={urlInputRef} />
      <button onClick={onPostButtonClick}>POST</button>
    </span>
  );
}

export default memo(RepoUrlInput);
