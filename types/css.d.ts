import "react";

/**
 * The stagger and delay hooks (`--i`, `--d`) are passed through inline styles
 * and read by CSS. React's CSSProperties doesn't allow custom properties by
 * default, so widen it here rather than casting at every call site.
 */
declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
