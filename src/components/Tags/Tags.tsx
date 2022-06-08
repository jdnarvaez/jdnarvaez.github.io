import { Tag } from './Tag';

import styles from './Tags.module.scss';

type Props = {
  tags?: string[];
};

export const Tags = ({ tags }: Props) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
};
