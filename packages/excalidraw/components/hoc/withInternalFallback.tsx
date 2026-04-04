import React, { useLayoutEffect, useRef } from "react";

import type { TunnelsContextValue } from "../../context/tunnels";
import { useTunnels } from "../../context/tunnels";
import { atom } from "../../editor-jotai";

export const withInternalFallback = <P,>(
  componentName: string,
  Component: React.FC<P>,
) => {
  const renderAtom = atom(0);

  const TunnelBoundInner: React.FC<
    P & {
      __fallback?: boolean;
      tunnels: TunnelsContextValue;
    }
  > = (props) => {
    const { tunnels, ...rest } = props;
    const {
      tunnelsJotai: { useAtom },
    } = tunnels;
    // for rerenders
    const [, setCounter] = useAtom(renderAtom);
    // for initial & subsequent renders. Tracked as component state
    // due to excalidraw multi-instance scanerios.
    const metaRef = useRef({
      // flag set on initial render to tell the fallback component to skip the
      // render until mount counter are initialized. This is because the counter
      // is initialized in an effect, and thus we could end rendering both
      // components at the same time until counter is initialized.
      preferHost: false,
      counter: 0,
    });

    useLayoutEffect(() => {
      const meta = metaRef.current;
      setCounter((c) => {
        const next = c + 1;
        meta.counter = next;

        return next;
      });
      return () => {
        setCounter((c) => {
          const next = c - 1;
          meta.counter = next;
          if (!next) {
            meta.preferHost = false;
          }
          return next;
        });
      };
    }, [setCounter]);

    if (!rest.__fallback) {
      metaRef.current.preferHost = true;
    }

    // ensure we don't render fallback and host components at the same time
    if (
      // either before the counters are initialized
      (!metaRef.current.counter &&
        rest.__fallback &&
        metaRef.current.preferHost) ||
      // or after the counters are initialized, and both are rendered
      // (this is the default when host renders as well)
      (metaRef.current.counter > 1 && rest.__fallback)
    ) {
      return null;
    }

    // Cast needed due to TS generic inference limitations with `rest` spread:
    // after stripping `tunnels`, `rest` is not inferred as `P & { __fallback? }`
    // for `Component: React.FC<P>`, so we assert the shape we actually pass.
    return <Component {...(rest as P & { __fallback?: boolean })} />;
  };

  TunnelBoundInner.displayName = `${componentName}TunnelBound`;

  const WrapperComponent: React.FC<
    P & {
      __fallback?: boolean;
    }
  > = (props) => {
    const tunnels = useTunnels();
    if (!tunnels) {
      return null;
    }
    return <TunnelBoundInner {...props} tunnels={tunnels} />;
  };

  WrapperComponent.displayName = componentName;

  return WrapperComponent;
};
