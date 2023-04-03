import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CoolIcon } from './CoolIcon';
import { ThemeColors } from '../../styled';
import { useSnackbar } from '../../hooks/useSnackbar';
import { device } from '../../StyledTheme';


interface CoolStyledSnackbarProps {
  color?: keyof ThemeColors
}

const showSnackAnimation = keyframes`
  0%   {bottom:-100px;}
  10%   {bottom:20px}
  80%   {bottom:20px}
  90%   {bottom:-100px}

`
const CoolStyledSnackbar = styled.div<CoolStyledSnackbarProps>`
    position: absolute;
    background-color: ${props => props.theme.color.background.l3};
    display: flex;
    border-radius: 14px;
    border: ${props => `2px solid ${props.theme.color[props.color ? props.color : 'main'].l3}}`};
    display: flex;
    box-sizing: border-box;
    gap: 4px;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    align-items: center;
    gap: 4px;
    padding: 14px 24px;
    flex-grow: 1;
    max-width: 500px;
    font-size: ${props => props.theme.fontSize.buttonText};
    min-height: 70px;
    height: 70px;
    bottom: -100px;
    z-index: 50;
    left: 30px;
    @media ${device.tablet} { 
        left: 0;
        right: 0;
        min-height: 90px;
        height: 90px;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
    }
    &.fadeIn {
        animation: ${showSnackAnimation} 3s;
        animation-timing-function: ease-in-out;
    }
    & svg {
        font-size: 1.5rem;
        min-width: 25px;
        color: ${props => props.theme.color[props.color ? props.color : 'main'].n};
    }

`;




export function CoolSnackbar() {

  const { snackbarProps, setSnackbarProps } = useSnackbar()

  useEffect(() => {
    if (snackbarProps.visible) {
      setTimeout(() => {
        setSnackbarProps({ visible: false })
      }, 3000);
    }
  }, [snackbarProps.visible])


  return (
    snackbarProps.visible ?
      <CoolStyledSnackbar color={snackbarProps.color} className={snackbarProps.visible ? 'fadeIn ' : ''}>
        {snackbarProps.iconType ?
          <CoolIcon type={snackbarProps.iconType} />
          :
          undefined
        }
        <p>{snackbarProps.text}</p>
      </CoolStyledSnackbar>
      :
      <></>
  )
}