import { JSX } from 'react';

export function HTMLComment({
  text,
  key,
}: {
  text: string;
  key: number;
}): JSX.Element {
  return (
    <span
      key={key}
      data-attribute-name="HTMLComment"
      className="hidden"
      dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }}
    />
  );
}
