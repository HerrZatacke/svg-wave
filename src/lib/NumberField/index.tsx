import { NumberField as BaseNumberField } from '@base-ui-components/react/number-field';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  type FormControlProps,
} from '@mui/material';
import { useId } from 'react';


export default function NumberField({
  id: idProp,
  label,
  unitLabel,
  error,
  size = 'medium',
  ...other
}: BaseNumberField.Root.Props & {
  label?: string;
  unitLabel?: string;
  size?: FormControlProps['size'];
  error?: boolean;
}) {
  let id = useId();
  if (idProp) {
    id = idProp;
  }

  return (
    <BaseNumberField.Root
      allowWheelScrub
      {...other}
      render={(props, state) => (
        <FormControl
          size={size}
          ref={props.ref}
          disabled={state.disabled}
          required={state.required}
          error={error}
          variant="outlined"
        >
          {props.children}
        </FormControl>
      )}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <BaseNumberField.Input
        id={id}
        render={(props, state) => (
          <OutlinedInput
            label={label}
            inputRef={props.ref}
            value={state.inputValue}
            onBlur={props.onBlur}
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
            onKeyDown={props.onKeyDown}
            onFocus={props.onFocus}
            slotProps={{
              input: props,
            }}
            endAdornment={
              <InputAdornment position="end">
                <Stack direction="row" alignItems="center" gap={1}>
                  {unitLabel && <Typography variant="body2">{unitLabel}</Typography>}
                  <Stack
                    direction="column"
                    gap={0}
                    sx={{
                      borderLeft: '1px solid',
                      borderColor: 'divider',
                      ml: 0,
                      '& button': {
                        py: 0,
                        flex: 1,
                        borderRadius: 0.5,
                      },
                    }}
                  >
                    <BaseNumberField.Increment
                      render={<IconButton size={size} aria-label="Increase" />}
                    >
                      <KeyboardArrowUpIcon
                        fontSize={size}
                        sx={{ transform: 'translateY(2px)' }}
                      />
                    </BaseNumberField.Increment>

                    <BaseNumberField.Decrement
                      render={<IconButton size={size} aria-label="Decrease" />}
                    >
                      <KeyboardArrowDownIcon
                        fontSize={size}
                        sx={{ transform: 'translateY(-2px)' }}
                      />
                    </BaseNumberField.Decrement>
                  </Stack>
                </Stack>
              </InputAdornment>
            }
            sx={{ pr: 0 }}
          />
        )}
      />
    </BaseNumberField.Root>
  );
}
