import cn from 'classnames';
import {memo} from 'react';

import classes from './ErrorPage.module.css';

interface Props {
  className?: string;
  error: string;
}

function ErrorPage(props: Props) {
  return (
    <div className={cn(props.className, classes.root)}>
      <div>{props.error}</div>
    </div>
  );
}

export default memo(ErrorPage);
