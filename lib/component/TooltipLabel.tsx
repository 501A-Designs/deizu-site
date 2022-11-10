import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { styled } from '../../stitches.config';
import { popOut } from '../ux/keyframes';

const ContentStyled = styled(Tooltip.Content,{
  background:'$gray6',
  color:'$gray12',
  border:'1px solid $gray6',
  boxShadow:'$heavy',
  padding:'$1 $2',
  fontSize:'$s',
  borderRadius:'$1',
  zIndex:'1000'
})
const ArrowStyled = styled(Tooltip.Arrow,{
  fill:'$gray6',
})

interface TooltipLabelProps extends React.ComponentProps<typeof ContentStyled>{
  trigger:JSX.Element | JSX.Element[],
  keyframes?:any
}

export function TooltipLabel(props:TooltipLabelProps) {
  return (
    <Tooltip.Provider
      delayDuration={800}
      skipDelayDuration={500}
    >
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{props.trigger}</Tooltip.Trigger>
        <ContentStyled
          side={props.side}
          sideOffset={5}
          css={{
            animation: `${props.keyframes} 0.3s ease-out`,
          }}
        >
          {props.children}
          <ArrowStyled width={11} height={5} />
        </ContentStyled>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}