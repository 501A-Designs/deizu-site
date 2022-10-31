import React from 'react'
import { styled } from '@stitches/react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { FiChevronDown } from 'react-icons/fi';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = styled(PopoverPrimitive.Trigger, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  gap: '5px',
  padding: '10px 25px',
  outline: 'none',
  transition: '0.25s',
  borderRadius: 'var(--borderRadius1)',
  color: 'var(--txtColor1)',
  backgroundColor: 'var(--system3)',
  border: '1px solid var(--system0)',
  cursor: 'pointer'
});
export const PopoverContent = styled(PopoverPrimitive.Content, {
  backgroundColor: 'var(--system0)',
  border: '1px solid var(--system1)',
  borderRadius: 'var(--borderRadius1)',
  transform: 'translateX(-30%) translateY(5%)',
  width: '200px',
  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  padding:'0.5em',
});
