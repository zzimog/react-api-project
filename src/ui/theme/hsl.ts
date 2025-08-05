export interface hsl {
  alpha: (a: number) => hsl;
  darken: (c: number) => hsl;
  lighten: (c: number) => hsl;
  hex: () => string;
  toString: () => string;
}

export function hsl(hh: number, ss: number, ll: number, aa: number = 1): hsl {
  const clamp = (val: number, min: number, max: number) => {
    return Math.max(Math.min(val, max), min);
  };

  const h = clamp(hh, 0, 255);
  const s = clamp(ss, 0, 100);
  const l = clamp(ll, 0, 100);

  return {
    alpha(alpha: number) {
      return hsl(h, s, l, alpha);
    },
    darken(coefficient: number = 0.4) {
      return hsl(h, s, l - l * coefficient);
    },
    lighten(coefficient: number = 0.4) {
      return hsl(h, s, l + l * coefficient);
    },
    hex() {
      return `rgba(${hsl2rgb(h, s, l)})`;
    },
    toString() {
      if (aa !== 1) {
        return `hsla(${h}, ${s}%, ${l}%, ${aa})`;
      }

      return `hsl(${h}, ${s}%, ${l}%)`;
    },
  };
}

function hsl2rgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
