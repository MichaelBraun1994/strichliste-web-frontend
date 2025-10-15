import * as React from 'react';
import { FormattedNumber } from 'react-intl';
import { useSettings } from '../../store';

interface Props {
  value: number;
  hidePlusSign?: boolean;
}

export function Currency({ value, hidePlusSign }: Props): JSX.Element {
  const settings = useSettings();
  const customCurrencySign = settings.i18n.currency.symbol;
  return (
    <>
      {value > 0 && !hidePlusSign ? '+' : ''}
      <FormattedNumber value={value / 100} />
      {customCurrencySign}
    </>
  );
}
