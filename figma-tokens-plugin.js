// ═══════════════════════════════════════════════════════
// createdinua.org — Design System Tokens for Figma
// Paste this into a Figma plugin (Run Once) to create
// all variable collections matching tokens.css
// ═══════════════════════════════════════════════════════

function hexToRgba(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b, a: 1 };
}

function createColor(collection, modeId, name, hex) {
  const v = figma.variables.createVariable(name, collection, "COLOR");
  v.setValueForMode(modeId, hexToRgba(hex));
  return v;
}

function createNum(collection, modeId, name, value) {
  const v = figma.variables.createVariable(name, collection, "FLOAT");
  v.setValueForMode(modeId, value);
  return v;
}

// ─── COLORS ───
const colors = figma.variables.createVariableCollection("Colors");
const cm = colors.modes[0].modeId;

// Primary
createColor(colors, cm, "color/primary", "#33b5ff");
createColor(colors, cm, "color/primary-hover", "#1a9de6");
createColor(colors, cm, "color/primary-light", "#e6f5ff");

// Accent
createColor(colors, cm, "color/accent", "#ffd700");
createColor(colors, cm, "color/accent-hover", "#d4b300");
createColor(colors, cm, "color/accent-light", "#fff9e0");

// Neutral
createColor(colors, cm, "color/background", "#ffffff");
createColor(colors, cm, "color/surface", "#f8f9fb");
createColor(colors, cm, "color/surface-elevated", "#ffffff");
createColor(colors, cm, "color/border", "#e2e5ea");
createColor(colors, cm, "color/border-subtle", "#f0f1f3");

// Text
createColor(colors, cm, "color/text-primary", "#111827");
createColor(colors, cm, "color/text-secondary", "#4b5563");
createColor(colors, cm, "color/text-muted", "#9ca3af");
createColor(colors, cm, "color/text-inverse", "#ffffff");
createColor(colors, cm, "color/text-on-primary", "#ffffff");
createColor(colors, cm, "color/text-on-accent", "#111827");

// Semantic
createColor(colors, cm, "color/success", "#16a34a");
createColor(colors, cm, "color/warning", "#f59e0b");
createColor(colors, cm, "color/error", "#dc2626");
createColor(colors, cm, "color/info", "#2563eb");

// ─── TYPOGRAPHY ───
const typo = figma.variables.createVariableCollection("Typography");
const tm = typo.modes[0].modeId;

createNum(typo, tm, "text/xs", 12);
createNum(typo, tm, "text/sm", 14);
createNum(typo, tm, "text/base", 16);
createNum(typo, tm, "text/lg", 18);
createNum(typo, tm, "text/xl", 20);
createNum(typo, tm, "text/2xl", 24);
createNum(typo, tm, "text/3xl", 30);
createNum(typo, tm, "text/4xl", 36);
createNum(typo, tm, "text/5xl", 48);

createNum(typo, tm, "leading/tight", 1.25);
createNum(typo, tm, "leading/normal", 1.5);
createNum(typo, tm, "leading/relaxed", 1.625);

createNum(typo, tm, "weight/normal", 400);
createNum(typo, tm, "weight/medium", 500);
createNum(typo, tm, "weight/semibold", 600);
createNum(typo, tm, "weight/bold", 700);

// ─── SPACING ───
const spacing = figma.variables.createVariableCollection("Spacing");
const sm = spacing.modes[0].modeId;

createNum(spacing, sm, "spacing/0", 0);
createNum(spacing, sm, "spacing/1", 4);
createNum(spacing, sm, "spacing/2", 8);
createNum(spacing, sm, "spacing/3", 12);
createNum(spacing, sm, "spacing/4", 16);
createNum(spacing, sm, "spacing/5", 20);
createNum(spacing, sm, "spacing/6", 24);
createNum(spacing, sm, "spacing/8", 32);
createNum(spacing, sm, "spacing/10", 40);
createNum(spacing, sm, "spacing/12", 48);
createNum(spacing, sm, "spacing/16", 64);
createNum(spacing, sm, "spacing/20", 80);
createNum(spacing, sm, "spacing/24", 96);

// ─── RADIUS ───
const radius = figma.variables.createVariableCollection("Radius");
const rm = radius.modes[0].modeId;

createNum(radius, rm, "radius/sm", 4);
createNum(radius, rm, "radius/md", 8);
createNum(radius, rm, "radius/lg", 12);
createNum(radius, rm, "radius/xl", 16);
createNum(radius, rm, "radius/2xl", 24);
createNum(radius, rm, "radius/full", 9999);

// ─── LAYOUT ───
const layout = figma.variables.createVariableCollection("Layout");
const lm = layout.modes[0].modeId;

createNum(layout, lm, "max-width/content", 1200);
createNum(layout, lm, "max-width/narrow", 768);

figma.notify("✅ Created 58 variables across 5 collections!");
figma.closePlugin();
