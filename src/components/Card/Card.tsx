import { FC, JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Card: FC<any> = ({ ...props }): JSX.Element => {
  if (props.properties.contentType === 'series') {
    console.log('Card props:', props);
  }
  const schema = (contentType: string) => {
    switch (contentType) {
      case 'series':
        return (
          <div
            itemScope
            itemType="https://schema.org/TVSeries">
            <span itemProp="name">Greys Anatomy</span> is a medical drama
            television series created by
            <div
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person">
              <span itemProp="name">Shonda Rimes</span>
            </div>
            Starring:
            <div
              itemProp="actor"
              itemScope
              itemType="https://schema.org/Person">
              <span itemProp="name">Justin Chambers</span>
            </div>
            <div
              itemProp="actor"
              itemScope
              itemType="https://schema.org/Person">
              <span itemProp="name">Jessica Capshaw</span>
            </div>
            <div
              itemProp="containsSeason"
              itemScope
              itemType="https://schema.org/TVSeason">
              <span itemProp="name">Season 1</span> -
              <meta
                itemProp="numberOfEpisodes"
                content="14"
              />
              <meta
                itemProp="datePublished"
                content="2005-05-22">
                May 22, 2005
              </meta>
            </div>
            <div
              itemProp="containsSeason"
              itemScope
              itemType="https://schema.org/TVSeason">
              <span itemProp="name">Season 2</span> -
              <meta
                itemProp="numberOfEpisodes"
                content="27"
              />
              <meta
                itemProp="datePublished"
                content="2006-05-14">
                May 14, 2006
              </meta>
              <div
                itemProp="episode"
                itemScope
                itemType="https://schema.org/TVEpisode">
                <span itemProp="name">Episode 1</span> -
                <meta
                  itemProp="episodeNumber"
                  content="1"
                />
              </div>
            </div>
          </div>
        );

      case 'movie':
        // code block
        break;
      default:
      // code block
    }
  };

  return (
    <Link href={props.properties.meta.permalink || '#'}>
      <div className="aspect-video relative border-4 overflow-hidden hover:scale-105 transition-transform duration-300 border-white/20 hover:[border-image:linear-gradient(to_right,var(--primaryPressed),var(--primaryEnabled))_1] border-solid p-4">
        <Image
          src={props.properties.image.replace(
            'https://',
            'https://dimages.cds.amcn.com/484x272/filters:quality(90):format(jpg)/'
          )}
          alt={props.properties.analyticsObject?.contentShow || 'Card Image'}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </Link>
  );
};

export default Card;

// https://dimages.cds.amcn.com/484x272/filters:quality(90):format(jpg)/images.cds.amcn.com/amcn/tve/RiseOfThe49ers_04_1280x720_DesktopWebSwimlane.jpg"
