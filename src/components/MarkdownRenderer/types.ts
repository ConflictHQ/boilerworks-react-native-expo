export interface MarkdownRendererTheme {
  colors: {
    heading: {
      primary: string;
      secondary: string;
    };
    text: string;
    code: {
      background: string;
      border: string;
      text: string;
    };
    blockquote: {
      background: string;
      border: string;
    };
    table: {
      headerBackground: string;
      bodyBackground: string;
      border: string;
    };
    link: string;
    hr: string;
  };
}
