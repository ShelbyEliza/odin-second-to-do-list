import { resolve } from "path";

export const mode = "production";
export const entry = "./src/index.js";
export const devtool = "inline-source-map";
export const output = {
	filename: "main.js",
	path: resolve(__dirname, "dist"),
};
