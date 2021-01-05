// 全局的一些公用类型

interface ILocation {
  pathname?: string;
  search?: string;
  hash?: string;
  state?: string;
}

interface Match {
  isExact: boolean,
  params: any,
  path: string,
  url: string,
}

interface IHistory {
  length: number;
  action: 'POP' | string;
  location: ILocation;
  createHref(location: any): void;
  push(path: string, state?: any): void;
  replace(path: string, state?: any): void;
  go(n: number): void;
  goBack(): void;
  goForward(): void;
  block(prompt: any): void;
  listen(listener: any): void;
}
