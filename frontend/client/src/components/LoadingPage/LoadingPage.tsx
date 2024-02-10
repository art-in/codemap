import cn from 'classnames';
import {memo} from 'react';

import classes from './LoadingPage.module.css';

interface Props {
  className?: string;
}

function LoadingPage(props: Props) {
  return <div className={cn(props.className, classes.root)}>Loading...</div>;
}

export default memo(LoadingPage);
