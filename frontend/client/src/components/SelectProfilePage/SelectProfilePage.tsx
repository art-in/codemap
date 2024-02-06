import {memo, useCallback, useState} from 'react';
import cn from 'classnames';
import ProfileFileInput from './components/ProfileFileInput/ProfileFileInput';
import RepoUrlInput from './components/RepoUrlInput';
import classes from './SelectProfilePage.module.css';
import SourceTypeSelector from './components/SourceTypeSelector';
import ProfileSourceType from '../../models/ProfileSourceType';

interface Props {
  className?: string;
  onRepoUrlSelected: (url: string) => void;
  onProfileFileSelected: (contents: string) => void;
}

function SelectProfilePage(props: Props) {
  const [sourceType, setSourceType] = useState(ProfileSourceType.RepoUrl);

  const onSourceTypeChange = useCallback((type: ProfileSourceType) => {
    setSourceType(type);
  }, []);

  return (
    <div className={cn(props.className, classes.root)}>
      <div className={classes['source-selector']}>
        {sourceType == ProfileSourceType.RepoUrl && (
          <RepoUrlInput
            className={classes['repo-url']}
            onUrlSelected={props.onRepoUrlSelected}
          />
        )}
        {sourceType == ProfileSourceType.ProfileFile && (
          <ProfileFileInput onFileSelected={props.onProfileFileSelected} />
        )}
      </div>
      <SourceTypeSelector type={sourceType} onChange={onSourceTypeChange} />
    </div>
  );
}

export default memo(SelectProfilePage);
