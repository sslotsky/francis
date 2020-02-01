import { Config } from "@stencil/core";
import { postcss } from "@stencil/postcss";
import postCSSPresetEnv from "postcss-preset-env";

export const config: Config = {
  namespace: "live-jazz",
  plugins: [
    postcss({
      plugins: [
        postCSSPresetEnv({
          features: {
            "custom-media-queries": true,
            "nesting-rules": true
          }
        })
      ]
    })
  ],
  outputTargets: [
    {
      type: "dist",
      esmLoaderPath: "../loader"
    },
    {
      type: "docs-readme"
    },
    {
      type: "www",
      serviceWorker: null // disable service workers
    }
  ]
};
