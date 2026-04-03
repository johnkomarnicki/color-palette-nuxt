import {
  parse,
  formatHex,
  nearest,
  differenceCiede2000,
  colorsNamed,
  interpolate,
  oklch,
} from "culori";

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type Shade = (typeof SHADES)[number];

// Target OKLCH lightness per shade
const TARGET_L: Record<Shade, number> = {
  50: 0.962,
  100: 0.928,
  200: 0.876,
  300: 0.81,
  400: 0.735,
  500: 0.662,
  600: 0.591,
  700: 0.516,
  800: 0.447,
  900: 0.394,
  950: 0.330,
};

function mixOklch(color1: string, color2: string, t: number): string {
  const a = parse(color1);
  const b = parse(color2);
  if (!a || !b) return color1;
  return formatHex(interpolate([a, b], "oklch")(t)) ?? color1;
}

export function generateColorScale(hex: string): Record<number, string> {
  const input = oklch(parse(hex)!);
  if (!input) return {};

  const inputL = input.l;

  // Find which shade the input color's lightness best matches
  let anchorShade: Shade = 500;
  let minDist = Infinity;
  for (const shade of SHADES) {
    const dist = Math.abs(inputL - TARGET_L[shade]);
    if (dist < minDist) {
      minDist = dist;
      anchorShade = shade;
    }
  }

  const scale: Record<number, string> = {};

  for (const shade of SHADES) {
    if (shade === anchorShade) {
      scale[shade] = hex;
      continue;
    }

    const targetL = TARGET_L[shade];

    if (targetL > inputL) {
      const t = (targetL - 1.0) / (inputL - 1.0);
      scale[shade] = mixOklch("white", hex, Math.max(0, Math.min(1, t)));
    } else {
      const t = targetL / inputL;
      scale[shade] = mixOklch("black", hex, Math.max(0, Math.min(1, t)));
    }
  }

  return scale;
}

export function getColorName(hex: string): string {
  const allNames = Object.keys(colorsNamed);
  const nearestColors = nearest(allNames, differenceCiede2000());
  const names = nearestColors(hex, 2);
  return names[1] || names[0] || "Unknown";
}

export function generateRandomHex(): string {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
}

export function useColorPalette(baseColor: Ref<string>) {
  const palette = computed(() => {
    const scale = generateColorScale(baseColor.value);
    return SHADES.map((shade) => ({
      shade,
      hex: scale[shade],
    }));
  });

  const colorName = computed(() => getColorName(baseColor.value));

  return { shades: SHADES, palette, colorName };
}
