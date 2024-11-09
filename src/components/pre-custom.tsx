import { type Event } from '@/lib/events';
import { cn } from '@/lib/utils';
import { type Style } from '@/registry/styles';
import { type NpmCommands } from '@/types/unist.type';

import { CopyButton, CopyNpmCommandButton } from './copy-button';
import { StyleWrapper } from './style-wrapper';

type PreProps = React.HTMLProps<HTMLPreElement> & {
  __style__?: Style['name'];
  __rawString__?: string;
  __withMeta__?: boolean;
  __src__?: string;
  __event__?: Event['name'];
} & NpmCommands;

export function PreCustom({
  className,
  __rawString__,
  __npmCommand__,
  __yarnCommand__,
  __pnpmCommand__,
  __bunCommand__,
  __withMeta__,
  __src__,
  __event__,
  __style__,
  children,
  ...rest
}: PreProps) {
  return (
    <StyleWrapper styleName={__style__}>
      <div className="relative mb-4 mt-6">
        <pre
          className={cn(
            'max-h-[650px] overflow-x-auto rounded-lg border bg-[#001626] py-4',
            className,
          )}
          {...rest}
        >
          {children}
        </pre>
        {__rawString__ && (
          <CopyButton
            value={__rawString__}
            event={__event__}
            className={cn(
              'absolute right-4 top-4 z-10',
              __withMeta__ && 'top-16',
            )}
          />
        )}
        {__npmCommand__ &&
          __yarnCommand__ &&
          __pnpmCommand__ &&
          __bunCommand__ && (
            <CopyNpmCommandButton
              commands={{
                __npmCommand__,
                __yarnCommand__,
                __pnpmCommand__,
                __bunCommand__,
              }}
              className={cn(
                'absolute right-4 top-4 z-10',
                __withMeta__ && 'top-16',
              )}
            />
          )}
      </div>
    </StyleWrapper>
  );
}
