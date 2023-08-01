import React from 'react'
import { DanceFloorProps } from '../types/types'

// uses the same props as the Dance Floor
export const ControlsParent: React.FC<DanceFloorProps> = ({ children }) => {
  return (
    <div>{children}</div>
  )
}
