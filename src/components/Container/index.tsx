import React, { useMemo, forwardRef } from 'react';
import { useSafeAreaInsets, Edges } from 'react-native-safe-area-context';
import {
  StyledSafeAreaView,
  StyledKeyboardAwareScrollView,
  Wrapper,
} from './styled';
import type { ContainerProps, ContainerVariant } from './types';
import type { ScrollView } from 'react-native';

const Container = forwardRef<ScrollView, ContainerProps>(
  (
    {
      children,
      variant = 'default',
      keyboardAvoiding = false,
      bounces = false,
      noInsets = false,
      noInsetsTop = false,
      noInsetsBottom = false,
      bottomInset,
      bottomOffset = 0,
      keyboardShouldPersistTaps,
      ...rest
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();

    const contentContainerStyle = useMemo(
      () => ({
        flexGrow: 1,
        ...(!noInsets
          ? {
              paddingTop: !noInsetsTop ? insets.top : 0,
              paddingBottom: bottomInset
                ? bottomInset
                : !noInsetsBottom
                  ? insets.bottom
                  : 0,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            }
          : {}),
      }),
      [insets, noInsets, noInsetsTop, noInsetsBottom, bottomInset]
    );

    const safeAreaEdges = useMemo(() => {
      if (noInsets) return [];

      const edges: Edges = [
        'left',
        'right',
        ...(!noInsetsTop ? ['top' as const] : []),
        ...(!noInsetsBottom ? ['bottom' as const] : []),
      ];

      return edges;
    }, [noInsets, noInsetsTop, noInsetsBottom]);

    if (keyboardAvoiding) {
      return (
        <Wrapper>
          <StyledKeyboardAwareScrollView
            ref={ref}
            bounces={bounces}
            contentContainerStyle={contentContainerStyle}
            keyboardShouldPersistTaps="handled"
            {...rest}
          >
            {children}
          </StyledKeyboardAwareScrollView>
        </Wrapper>
      );
    }

    return (
      <StyledSafeAreaView variant={variant} edges={safeAreaEdges} {...rest}>
        {children}
      </StyledSafeAreaView>
    );
  }
);

Container.displayName = 'Container';

export { ContainerVariant };
export default Container;
