import { ShowcaseSectionProps } from "../ShowcaseSection/types";

export interface ReplaySectionProps extends ShowcaseSectionProps {
  /** Bump to replay this section along with every other one on the page. */
  replayAllKey?: number;
}
