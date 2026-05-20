import { WifiOff } from 'lucide-react'
import React from 'react'

const ErrorComp = ({Err}) => {
  return (
    <div className="w-full h-50 text-red-500 flex flex-col gap-3 font-bold justify-center items-center">
        <WifiOff size={13} />
        {Err}
    </div>
  )
}

export default ErrorComp
