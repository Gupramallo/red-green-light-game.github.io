import { css, styled } from '@mui/material'
import { TRAFFIC_COLORS } from './constants'

export const Container = styled('div')`
  background: ${({ theme }) => theme.palette.grey[900]};
  background-image: linear-gradient(
    transparent 2%,
    ${({ theme }) => theme.palette.grey[900]},
    transparent 3%,
    ${({ theme }) => theme.palette.grey[900]}
  );
  width: ${({ theme }) => theme.spacing(37.5)};
  height: ${({ theme }) => theme.spacing(21.25)};
  border-radius: ${({ theme }) => theme.spacing(2.5)};
  border: solid 5px ${({ theme }) => theme.palette.grey[700]};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`

export const Light = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isTrafficLightOn' && prop !== 'color',
})<{ isTrafficLightOn?: boolean }>`
  ${({ color, theme, isTrafficLightOn }) => {
    const trafficMainColor =
      color === TRAFFIC_COLORS.red
        ? theme.palette.error.main
        : theme.palette.success.main
    const trafficBackgroundColor =
      color === TRAFFIC_COLORS.red ? 'brown' : 'lime'

    return css`
      background: ${trafficMainColor};
      background-image: radial-gradient(${trafficBackgroundColor}, transparent);
      background-size: 5px 5px;
      width: ${theme.spacing(12.5)};
      height: ${theme.spacing(12.5)};
      border-radius: 50%;
      border: dotted 2px ${trafficMainColor};
      box-shadow:
        0 0 20px ${theme.palette.grey[800]} inset,
        0 0 10px ${trafficMainColor};
      opacity: ${isTrafficLightOn ? 1 : 0.1};
    `
  }}
`
