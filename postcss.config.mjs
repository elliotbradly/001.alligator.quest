// postcss.config.mjs
const config = {
  plugins: {
    "postcss-import": {},
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xs": "36em",
        "mantine-breakpoint-sm": "48em",
        "mantine-breakpoint-md": "62em",
        "mantine-breakpoint-lg": "75em",
        "mantine-breakpoint-xl": "88em",
      },
    },
    autoprefixer: {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
  },
};

export default config;
