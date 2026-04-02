import React, { useMemo } from 'react';
import Markdown, { type MarkdownProps } from 'react-native-markdown-display';
import { Platform } from 'react-native';
import { useThemeValues } from '@/theme/hooks';
import { buildFontName } from '@/components/Text/styled';
import { ACCENT_FONT, BODY_FONT } from '@/constants/fonts';

type Props = {
  content: string;
};

const MONO_FONT = Platform.select({ ios: 'Courier', android: 'monospace' });

const MarkdownRenderer = ({ content }: Props) => {
  const { markdownRenderer: md } = useThemeValues();

  const styles: MarkdownProps['style'] = useMemo(
    () => ({
      // Container
      body: {
        backgroundColor: 'transparent',
      },

      // Headings
      heading1: {
        fontFamily: buildFontName(ACCENT_FONT, '800'),
        fontSize: 22,
        color: md.colors.heading.primary,
        marginBottom: 8,
        marginTop: 0,
      },
      heading2: {
        fontFamily: buildFontName(ACCENT_FONT, '800'),
        fontSize: 18,
        color: md.colors.heading.primary,
        marginBottom: 8,
        marginTop: 24,
      },
      heading3: {
        fontFamily: buildFontName(ACCENT_FONT, '800'),
        fontSize: 16,
        color: md.colors.heading.primary,
        marginBottom: 6,
        marginTop: 20,
      },
      heading4: {
        fontFamily: buildFontName(BODY_FONT, '600'),
        fontSize: 14,
        color: md.colors.heading.primary,
        marginBottom: 4,
        marginTop: 16,
      },
      heading5: {
        fontFamily: buildFontName(BODY_FONT, '600'),
        fontSize: 13,
        color: md.colors.heading.secondary,
        marginBottom: 4,
        marginTop: 16,
      },
      heading6: {
        fontFamily: buildFontName(BODY_FONT, '600'),
        fontSize: 12,
        color: md.colors.heading.secondary,
        marginBottom: 4,
        marginTop: 16,
      },

      // Paragraph & text
      paragraph: {
        fontFamily: buildFontName(BODY_FONT, '400'),
        fontSize: 14,
        color: md.colors.text,
        lineHeight: 22,
        marginBottom: 8,
        marginTop: 0,
      },
      text: {
        fontFamily: buildFontName(BODY_FONT, '400'),
        color: md.colors.text,
      },

      // Emphasis
      strong: {
        fontFamily: buildFontName(BODY_FONT, '600'),
        color: md.colors.heading.primary,
      },
      em: {
        fontFamily: buildFontName(BODY_FONT, '400', 'italic'),
        color: md.colors.text,
      },
      s: {
        color: md.colors.text,
        textDecorationLine: 'line-through',
      },

      // HR
      hr: {
        backgroundColor: md.colors.hr,
        height: 1,
        marginVertical: 16,
      },

      // Blockquote
      blockquote: {
        backgroundColor: md.colors.blockquote.background,
        borderColor: md.colors.blockquote.border,
        borderLeftWidth: 4,
        marginLeft: 0,
        marginBottom: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
      },

      // Lists
      bullet_list: {
        marginBottom: 8,
      },
      ordered_list: {
        marginBottom: 8,
      },
      list_item: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 4,
      },
      bullet_list_icon: {
        fontFamily: buildFontName(BODY_FONT, '400'),
        color: md.colors.text,
        marginLeft: 4,
        marginRight: 8,
        marginTop: 4,
      },
      bullet_list_content: {
        flex: 1,
      },
      ordered_list_icon: {
        fontFamily: buildFontName(BODY_FONT, '400'),
        fontSize: 14,
        color: md.colors.text,
        marginLeft: 4,
        marginRight: 8,
        marginTop: 2,
      },
      ordered_list_content: {
        flex: 1,
      },

      // Code
      code_inline: {
        fontFamily: MONO_FONT,
        fontSize: 13,
        color: md.colors.code.text,
        backgroundColor: md.colors.code.background,
        borderColor: md.colors.code.border,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 4,
      },
      code_block: {
        fontFamily: MONO_FONT,
        fontSize: 13,
        color: md.colors.code.text,
        backgroundColor: md.colors.code.background,
        borderColor: md.colors.code.border,
        borderWidth: 1,
        borderRadius: 6,
        padding: 12,
        marginBottom: 8,
      },
      fence: {
        fontFamily: MONO_FONT,
        fontSize: 13,
        color: md.colors.code.text,
        backgroundColor: md.colors.code.background,
        borderColor: md.colors.code.border,
        borderWidth: 1,
        borderRadius: 6,
        padding: 12,
        marginBottom: 8,
      },

      // Tables
      table: {
        borderWidth: 1,
        borderColor: md.colors.table.border,
        borderRadius: 6,
        marginBottom: 8,
        overflow: 'hidden',
      },
      thead: {
        backgroundColor: md.colors.table.headerBackground,
      },
      tbody: {
        backgroundColor: md.colors.table.bodyBackground,
      },
      tr: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: md.colors.table.border,
      },
      th: {
        flex: 1,
        padding: 8,
        fontFamily: buildFontName(BODY_FONT, '600'),
        fontSize: 13,
        color: md.colors.heading.primary,
      },
      td: {
        flex: 1,
        padding: 8,
        fontFamily: buildFontName(BODY_FONT, '400'),
        fontSize: 13,
        color: md.colors.text,
      },

      // Links
      link: {
        fontFamily: buildFontName(BODY_FONT, '400'),
        color: md.colors.link,
        textDecorationLine: 'none',
      },
      blocklink: {
        flex: 1,
        borderColor: md.colors.table.border,
        borderBottomWidth: 1,
      },

      // Image
      image: {
        flex: 1,
      },
    }),
    [md]
  );

  return <Markdown style={styles}>{content}</Markdown>;
};

export default MarkdownRenderer;
