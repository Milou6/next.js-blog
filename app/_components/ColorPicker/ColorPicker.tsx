'use client';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { RgbColor, RgbColorPicker } from 'react-colorful';
import { SchemeFidelity } from '@material/material-color-utilities';
import { argbToCSSRgb, rgbToHct } from '@/lib/colors-service';

// export default function ColorPicker() {
export default function ColorPicker({ className = undefined }: { className?: string | undefined }) {
  useEffect(() => {
    updateCSSVars(rgbColor);
  });

  const [rgbColor, setRgbColor] = useState({ r: 98, g: 209, b: 239 }); // good balance
  const [showColorPicker, setShowColorPicker] = useState(false);

  const updateCSSVars = (rgbColor: RgbColor) => {
    const scheme = new SchemeFidelity(rgbToHct(rgbColor), false, 0);

    const root = document.documentElement;
    root.style.setProperty('--primary', argbToCSSRgb(scheme.primary));
    root.style.setProperty('--onPrimary', argbToCSSRgb(scheme.onPrimary));
    root.style.setProperty('--primaryContainer', argbToCSSRgb(scheme.primaryContainer));
    root.style.setProperty('--onPrimaryContainer', argbToCSSRgb(scheme.onPrimaryContainer));
    root.style.setProperty('--secondary', argbToCSSRgb(scheme.secondary));
    root.style.setProperty('--onSecondary', argbToCSSRgb(scheme.onSecondary));
    root.style.setProperty('--secondaryContainer', argbToCSSRgb(scheme.secondaryContainer));
    root.style.setProperty('--onSecondaryContainer', argbToCSSRgb(scheme.onSecondaryContainer));
    root.style.setProperty('--tertiary', argbToCSSRgb(scheme.tertiary));
    root.style.setProperty('--onTertiary', argbToCSSRgb(scheme.onTertiary));
    root.style.setProperty('--tertiaryContainer', argbToCSSRgb(scheme.tertiaryContainer));
    root.style.setProperty('--onTertiaryContainer', argbToCSSRgb(scheme.onTertiaryContainer));
    root.style.setProperty('--error', argbToCSSRgb(scheme.error));
    root.style.setProperty('--onError', argbToCSSRgb(scheme.onError));
    root.style.setProperty('--errorContainer', argbToCSSRgb(scheme.errorContainer));
    root.style.setProperty('--onErrorContainer', argbToCSSRgb(scheme.onErrorContainer));
    root.style.setProperty('--background', argbToCSSRgb(scheme.background));
    root.style.setProperty('--onBackground', argbToCSSRgb(scheme.onBackground));
    root.style.setProperty('--surface', argbToCSSRgb(scheme.surface));
    root.style.setProperty('--onSurface', argbToCSSRgb(scheme.onSurface));
    root.style.setProperty('--surfaceContainerLow', argbToCSSRgb(scheme.surfaceContainerLow));
    root.style.setProperty('--surfaceContainerLowest', argbToCSSRgb(scheme.surfaceContainerLowest));
    root.style.setProperty('--surfaceContainer', argbToCSSRgb(scheme.surfaceContainer));
    root.style.setProperty('--surfaceContainerHigh', argbToCSSRgb(scheme.surfaceContainerHigh));
    root.style.setProperty('--surfaceContainerHighest', argbToCSSRgb(scheme.surfaceContainerHighest));
    root.style.setProperty('--surfaceVariant', argbToCSSRgb(scheme.surfaceVariant));
    root.style.setProperty('--onSurfaceVariant', argbToCSSRgb(scheme.onSurfaceVariant));
    root.style.setProperty('--outline', argbToCSSRgb(scheme.outline));
    root.style.setProperty('--outlineVariant', argbToCSSRgb(scheme.outlineVariant));
    root.style.setProperty('--shadow', argbToCSSRgb(scheme.shadow));
    root.style.setProperty('--scrim', argbToCSSRgb(scheme.scrim));
    root.style.setProperty('--inverseSurface', argbToCSSRgb(scheme.inverseSurface));
    root.style.setProperty('--inverseOnSurface', argbToCSSRgb(scheme.inverseOnSurface));
    root.style.setProperty('--inversePrimary', argbToCSSRgb(scheme.inversePrimary));
  };

  function toggleColorPicker() {
    setShowColorPicker(!showColorPicker);
  }

  return (
    <>
      <div className={[className, styles.colorPickerContainer].join(' ')}>
        <div>
          <RgbColorPicker
            className={showColorPicker ? 'picker visible' : 'picker'}
            color={rgbColor}
            onChange={setRgbColor}
          />
        </div>

        <button className="primary-container">
          <span className={['', 'material-symbols-outlined'].join(' ')} onClick={toggleColorPicker}>
            palette
          </span>
        </button>
      </div>
    </>
  );
}
