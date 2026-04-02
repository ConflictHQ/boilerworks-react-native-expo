import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react-native';

type Wrapper = React.ComponentType<PropsWithChildren>;

const DefaultWrapper: Wrapper = ({ children }) => <>{children}</>;

export const renderHook = <Result, Props = void>(
  callback: (props: Props) => Result,
  options: { initialProps?: Props; wrapper?: Wrapper } = {}
) => {
  const result = { current: undefined as Result };
  const initialProps = options.initialProps as Props;
  const WrapperComponent = options.wrapper ?? DefaultWrapper;

  const HookRunner: React.FC<{ hookProps: Props }> = ({ hookProps }) => {
    result.current = callback(hookProps);
    return null;
  };

  const renderResult = render(
    <WrapperComponent>
      <HookRunner hookProps={initialProps} />
    </WrapperComponent>
  );

  return {
    result,
    rerender: (nextProps: Props = initialProps) =>
      renderResult.rerender(
        <WrapperComponent>
          <HookRunner hookProps={nextProps} />
        </WrapperComponent>
      ),
    unmount: renderResult.unmount,
  };
};
