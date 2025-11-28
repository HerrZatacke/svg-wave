'use client';

import Button from '@mui/material/Button';
import { type ChangeEvent } from 'react';

interface Props {
  label: string;
  title?: string;
  onFileInputChange: (ev: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  multiple?: boolean;
}

export default function FileInput({ label, disabled, title, onFileInputChange, multiple }: Props) {

  return (
      <Button
        component="label"
        disabled={disabled}
        title={title}
      >
        {label}
        <input
          type="file"
          hidden
          disabled={disabled}
          multiple={multiple}
          onChange={onFileInputChange}
        />
      </Button>
  );
}
