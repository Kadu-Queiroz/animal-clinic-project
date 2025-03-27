declare namespace JSX {
    interface IntrinsicElements {
      'zapier-interfaces-chatbot-embed': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'is-popup'?: string | boolean;
          'chatbot-id'?: string;
          'auto-open'?: string | boolean;
          'opened'?: string | boolean;
          part?: string;
          style?: React.CSSProperties;
        },
        HTMLElement
      >;
    }
  }