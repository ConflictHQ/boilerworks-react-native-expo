import React, { useMemo } from 'react';
import { useTheme } from 'styled-components/native';
import { BODY_FONT } from '@/constants/fonts';
import UntitledUI from '@/components/Icons';
import {
  Card,
  CloseButton,
  Content,
  TitleText,
  BodyText,
  TitleRow,
} from './styled';
import type {
  MessageCardColorVariant,
  MessageCardProps,
  MessageCardSize,
} from './types';

const DEFAULT_CLOSE_ICON = 'x-close' as const;

const MessageCard: React.FC<MessageCardProps> = ({
  title,
  message,
  colorVariant = 'primary',
  size = 'medium',
  closeIcon = DEFAULT_CLOSE_ICON,
  onClose,
  accessibilityLabelClose,
  style,
  testID,
  ...rest
}) => {
  const theme = useTheme();

  const closeSize = useMemo(
    () => theme.messageCard.icon.close[size],
    [theme.messageCard.icon.close, size]
  );

  const closeIconColor = useMemo(
    () => theme.messageCard.colors[colorVariant].closeIcon,
    [theme.messageCard.colors, colorVariant]
  );

  const closeLabel = accessibilityLabelClose ?? 'Close message';

  return (
    <Card
      $colorVariant={colorVariant}
      $size={size}
      style={style}
      testID={testID}
      accessibilityRole="summary"
      {...rest}
    >
      <Content>
        <TitleRow>
          <TitleText
            $colorVariant={colorVariant}
            $size={size}
            $hasClose={Boolean(onClose)}
            family={BODY_FONT}
            weight="700"
            transform="uppercase"
            letterSpacing={0.7}
          >
            {title}
          </TitleText>
          {onClose && (
            <CloseButton
              hitSlop={20}
              $size={size}
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel={closeLabel}
            >
              <UntitledUI
                name={closeIcon}
                size={closeSize}
                color={closeIconColor}
              />
            </CloseButton>
          )}
        </TitleRow>
        <BodyText
          $colorVariant={colorVariant}
          $size={size}
          family={BODY_FONT}
          weight="400"
        >
          {message}
        </BodyText>
      </Content>
    </Card>
  );
};

export { MessageCardColorVariant, MessageCardSize };
export default MessageCard;
