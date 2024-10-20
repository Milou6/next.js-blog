'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';
import { RgbColor, RgbColorPicker } from 'react-colorful';
import { COLOR_PICKER_KEY, updateCSSColorSchemeWith } from '@/lib/colors-service';
import { debounce } from '@/lib/utils';
import { useClickAway } from '@/app/hooks/useClickAway';

export default function ColorPicker({ className = undefined }: { className?: string | undefined }) {
  const [rgbColor, setRgbColor] = useState({ r: 98, g: 209, b: 239 });
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    const localStorageColor = window.localStorage.getItem(COLOR_PICKER_KEY);
    setRgbColor(localStorageColor ? JSON.parse(localStorageColor) : { r: 98, g: 209, b: 239 });
  }, []);

  const saveColor = useCallback((newColor: RgbColor) => {
    if (window) {
      window.localStorage.setItem(COLOR_PICKER_KEY, JSON.stringify(newColor));
    }
  }, []);

  const debouncedSaveColor = useMemo(() => {
    return debounce(saveColor, 1_000);
  }, [saveColor]);

  function handleChangeColor(newColor: RgbColor) {
    setRgbColor(newColor);
    debouncedSaveColor(newColor); // avoid accessing localStorage too often
  }

  useEffect(() => {
    updateCSSColorSchemeWith(rgbColor);
  });

  const ref = useClickAway(() => {
    setShowColorPicker(false); // close ColorPicker when clicking away from it
  });

  return (
    <div ref={ref} className={[className, styles.colorPickerContainer].join(' ')}>
      <RgbColorPicker
        className={showColorPicker ? 'picker visible' : 'picker'}
        color={rgbColor}
        onChange={handleChangeColor}
      />

      <button className="btn-primary">
        <span className="material-symbols-outlined" onClick={() => setShowColorPicker(!showColorPicker)}>
          palette
        </span>
      </button>
    </div>
  );
}
