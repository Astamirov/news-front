declare module '*.css' {
    const exports: { [exportName: string]: string };
    export = exports;
  }

declare module "*.jpg";
declare module "*.svg";
declare module "*.png";