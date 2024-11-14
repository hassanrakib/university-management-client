export type Route = {
  path: string;
  element: React.JSX.Element;
};

export type Item = {
  name?: string;
  path?: string;
  element?: React.JSX.Element;
  children?: Item[];
};
