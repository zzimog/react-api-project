type ColorType = 'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla';

type ColorObject = {
  type: ColorType;
  alpha: number;
  values: [number, number, number];
};

function clamp(val: number, min: number, max: number) {
  return Math.max(Math.min(val, max), min);
}

export function hsl(
  hh: number,
  ss: number,
  ll: number,
  aa: number = 1
): string {
  const h = clamp(hh, 0, 255);
  const s = clamp(ss, 0, 100);
  const l = clamp(ll, 0, 100);

  if (aa !== 1) {
    return `hsla(${h}, ${s}%, ${l}%, ${aa})`;
  }

  return `hsl(${h}, ${s}%, ${l}%)`;
}

export function rgb2hex(r: number, g: number, b: number) {
  const int2hex = (c: number) => {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  };

  return '#' + int2hex(r) + int2hex(g) + int2hex(b);
}

export function hex2rgb(hex: string) {
  const bigint = parseInt(hex, 16);

  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return [r, g, b];
}

export function hsl2rgb(color: ColorObject) {
  const h = color.values[0] / 360;
  const s = color.values[1] / 100;
  const l = color.values[2] / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue(p, q, h + 1 / 3);
    g = hue(p, q, h);
    b = hue(p, q, h - 1 / 3);
  }

  return {
    type: 'rgb',
    values: [
      clamp(Math.round(r * 255), 0, 255),
      clamp(Math.round(g * 255), 0, 255),
      clamp(Math.round(b * 255), 0, 255),
    ],
  };
}

export function rgb2hsl(rr: number, gg: number, bb: number) {
  const r = rr / 255;
  const g = gg / 255;
  const b = bb / 255;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/*
export function getLuminance(color) {
  color = decomposeColor(color);

  let rgb =
    color.type === 'hsl' || color.type === 'hsla'
      ? decomposeColor(hslToRgb(color)).values
      : color.values;

  rgb = rgb.map((val) => {
    if (color.type !== 'color') {
      val /= 255; // normalized
    }

    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number(
    (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3)
  );
}
*/
