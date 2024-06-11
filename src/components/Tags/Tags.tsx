import { Tag } from './Tag';

type Props = {
  tags?: string[];
};

export const Tags = ({ tags }: Props) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
};
