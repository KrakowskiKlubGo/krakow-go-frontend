import { ParsedUrlQuery } from "querystring";

export interface detailPageParams extends ParsedUrlQuery {
  id: string;
}

export interface StaticImageData {
  src: string;
  height: number;
  width: number;
  blurDataURL?: string;
  blurWidth?: number;
  blurHeight?: number;
}
interface StaticRequire {
  default: StaticImageData;
}
export type StaticImport = StaticRequire | StaticImageData;
