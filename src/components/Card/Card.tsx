import { FC, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card: FC<any> = ({ ...props }): JSX.Element => {
  console.log('Card props:', props.properties.contentType);
  return (
    <>
      {props.properties.contentType === 'poster' ? (
        <div>
          <Link href={props.properties.meta.permalink || '#'}>
            <div className="aspect-video relative border-4 overflow-hidden hover:scale-105 transition-transform duration-300 border-white/20 hover:[border-image:linear-gradient(to_right,var(--primaryPressed),var(--primaryEnabled))_1] border-solid p-4">
              <Image
                src={props.properties.image}
                alt={
                  props.properties.analyticsObject?.contentShow || 'Card Image'
                }
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-rows-[repeat(4,min-content)] gap-4">
            <Link href={props.properties.meta.permalink || '#'}>
              <div className="aspect-video relative border-4 overflow-hidden hover:scale-105 transition-transform duration-300 border-white/20 hover:[border-image:linear-gradient(to_right,var(--primaryPressed),var(--primaryEnabled))_1] border-solid p-4">
                <Image
                  src={props.properties.image}
                  alt={
                    props.properties.analyticsObject?.contentShow ||
                    'Card Image'
                  }
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </Link>
            {'text' in props.properties && (
              <>
                <h4 className="font-body2">{props.properties.text.title}</h4>
                <p className="font-body0">
                  {props.properties.text.description}
                </p>
                <span className="font-body00">
                  {props.properties.text.duration}
                </span>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Card;
