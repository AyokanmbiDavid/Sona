import { RefreshCcw } from 'lucide-react'
import React from 'react'

const RefreshComp = ({func,loading}) => {
  return (
    <div>
      <div className=" ">
        <div 
        onClick={() => func()}
        className="fixed top-17 z-10 right-5 text-xs flex gap-0.5 cursor-pointer items-center">
            <span className="bg-white dark:bg-gray-900 rounded-md p-2
             border border-gray-200 dark:border-gray-800 ">Refresh</span>
          <span className="p-2 rounded-md bg-blue-500 text-white">
            <RefreshCcw size={14} className={`animate-${loading && 'spin'}`} />
          </span>
        </div>
      </div>
    </div>
  )
}

export default RefreshComp
