import type { PropsWithChildren } from 'react'
import type React from 'react'
import { Layout } from './styles'

const CenteredLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <Layout>{children}</Layout>
)

export default CenteredLayout
