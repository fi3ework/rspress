// src/node/source-build-plugin.ts
import { createRequire } from "module";
import path from "path";
import { fileURLToPath } from "url";

// tailwind.config.ts
var tailwindConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    backgroundColor: (ctx) => ({
      ...ctx.theme("colors"),
      white: "var(--rp-c-bg)",
      soft: "var(--rp-c-bg-soft)",
      mute: "var(--rp-c-bg-mute)"
    }),
    extend: {
      fontSize: {
        "3xl": "2rem",
        "2xl": "1.625rem",
        xl: "1.375rem",
        lg: "1.25rem"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      breakpoints: {
        xs: "640px",
        sm: "768px",
        md: "960px",
        lg: "1280px"
      },
      maxWidth: {
        "60": "15rem"
      },
      maxHeight: {
        "60": "15rem"
      },
      colors: {
        brand: {
          DEFAULT: "var(--rp-c-brand)",
          light: "var(--rp-c-brand-light)",
          dark: "var(--rp-c-brand-dark)",
          lighter: "var(--rp-c-brand-lighter)",
          darker: "var(--rp-c-brand-darker)"
        },
        text: {
          1: "var(--rp-c-text-1)",
          2: "var(--rp-c-text-2)",
          3: "var(--rp-c-text-3)",
          4: "var(--rp-c-text-4)"
        },
        divider: {
          DEFAULT: "var(--rp-c-divider)",
          light: "var(--rp-c-divider-light)",
          dark: "var(--rp-c-divider-dark)"
        },
        gray: {
          light: {
            1: "var(--rp-c-gray-light-1)",
            2: "var(--rp-c-gray-light-2)",
            3: "var(--rp-c-gray-light-3)",
            4: "var(--rp-c-gray-light-4)",
            5: "var(--rp-c-gray-light-5)"
          }
        },
        dark: {
          light: {
            1: "var(--rp-c-dark-light-1)",
            2: "var(--rp-c-dark-light-2)",
            3: "var(--rp-c-dark-light-3)",
            4: "var(--rp-c-dark-light-4)",
            5: "var(--rp-c-dark-light-5)"
          }
        }
      }
    }
  }
};

// src/node/source-build-plugin.ts
var require2 = createRequire(import.meta.url);
var ROOT_DIR = fileURLToPath(new URL("../..", import.meta.url).href);
function SourceBuildPlugin() {
  return {
    name: "theme-default:source-build",
    builderConfig: {
      resolve: {
        alias: {
          "rspress/theme": path.resolve(ROOT_DIR, "./src")
        }
      },
      tools: {
        postcss: (_, { addPlugins }) => {
          try {
            addPlugins(
              require2("tailwindcss")({
                config: {
                  ...tailwindConfig,
                  content: tailwindConfig.content.map(
                    (item) => path.resolve(ROOT_DIR, item)
                  )
                }
              })
            );
          } catch (e) {
          }
        }
      }
    }
  };
}
export {
  SourceBuildPlugin
};

//# sourceMappingURL=source-build-plugin.js.map