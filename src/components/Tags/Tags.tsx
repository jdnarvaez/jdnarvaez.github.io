import { scaleOrdinal } from '@visx/scale';
import { useMemo } from 'react';
import { Tag } from './Tag';

const colors = [
  '#CEFF00',
  '#1F91C7',
  '#527EC3',
  '#7A67B2',
  '#964E92',
  '#A23569',
];

type Props = {
  tags?: string[];
};

export const Tags = ({ tags }: Props) => {
  const colorScale = useMemo(
    () =>
      scaleOrdinal({
        domain: tags,
        range: colors,
      }),
    [tags]
  );

  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Tag key={tag} background={colorScale(tag)}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
