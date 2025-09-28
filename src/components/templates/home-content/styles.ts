import { Box, CardContent, Typography, css, styled } from '@mui/material'

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: ${({ theme }) => theme.spacing(2.5)};
  margin-top: ${({ theme }) => theme.spacing(5)};
  text-align: center;
`

export const CardContainer = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  ${({ theme }) => css`
    ${theme.breakpoints.up('sm')} {
      width: ${theme.spacing(50)};
    }

    ${theme.breakpoints.down('sm')} {
      max-width: ${theme.spacing(45)};
    }
  `}
`

export const ImageContainer = styled(Box)`
  width: ${({ theme }) => theme.spacing(25)};
  height: ${({ theme }) => theme.spacing(25)};
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.info.light};
  box-shadow: 3px;
  border: 4px solid ${({ theme }) => theme.palette.grey[200]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  overflow: hidden;
`
export const TrafficImage = styled('img')`
  width: 80%;
  height: 80%;
  align-self: center;
  justify-self: center;
`

export const Subtitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.secondary};
`
