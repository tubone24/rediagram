import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type LambdaProps = {
  type?: LambdaType;
  name: string;
} & HasDependences;

export type LambdaType = 'Lambda Function';

function resolveImage(type?: LambdaType): string {
  switch (type) {
    case 'Lambda Function':
      return resolve(__dirname, '../../../assets/compute/Lambda/Lambda-Function.png');
    default:
      return resolve(__dirname, '../../../assets/compute/Lambda.png');
  }
}

function useIcon(type?: LambdaType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const Lambda: FC<LambdaProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Lambda.displayName = 'Lambda';
