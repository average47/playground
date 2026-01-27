export interface TabItem {
  active: boolean;
  analyticsObject: AnalyticsObject;
  key: string;
  permalink: string;
  label: string;
}

type AnalyticsObject = {
  navComponentName: string;
};
