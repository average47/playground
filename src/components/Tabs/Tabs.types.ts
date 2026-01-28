export interface ITabProps {
  active: boolean;
  analyticsObject: AnalyticsObject;
  key: string;
  permalink: string;
  label: string;
}

type AnalyticsObject = {
  navComponentName: string;
  amcnId: string
  contentEpisode: number
  contentNetworkOfRecordId: number
  contentSeason: number
  contentShow: string
  contentTitle: string
  nid: number
  events: Events
};

export interface ITabItemProps {
  type: string;
  properties: {
    id: string;
  };
  children: any[];
  key: string;
}




export interface ICardProps {
  type: string
  properties: Properties
}

type Properties = {
  TTS: Tts
  analyticsObject: AnalyticsObject
  contentType: string
  image: string
  layout: string
  meta: Meta
  playBadge: PlayBadge
  text: Text
}

type Tts ={
  speechText: string
}

type Events = {
  play_click: PlayClick
}

type PlayClick = {
  label: string
  event_name: string
}

type Meta = {
  nid: number
  permalink: string
}

type PlayBadge {
  icon: string
}

type Text = {
  description: string
  title: string
  duration: string
}
