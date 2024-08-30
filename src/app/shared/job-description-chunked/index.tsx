import React from 'react';

interface Item {
  [key: string]: string;
}

interface Props {
  data: any;
  className?: string;
}

const JobDescription =
  () =>
  ({ data, className }: Props) => {
    // Convert the data object to a single concatenated string
    const dataString = Object.values(data).join(' ');

    return <div className={className}>{dataString}</div>;
  };

export default JobDescription;
