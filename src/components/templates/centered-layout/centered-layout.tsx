import type { PropsWithChildren } from 'react'
import type React from 'react'
import { Layout } from './styles'

const CenteredLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <Layout data-testid="centered-layout">{children}</Layout>
)

export default CenteredLayout
