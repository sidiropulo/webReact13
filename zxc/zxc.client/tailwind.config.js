/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export const content = [
  "./src/**/*.{html,js}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
];
export const theme = {
  extend: {},
};
export const plugins = [nextui()];

// tailwind.config.js

export const darkMode = 'class';
