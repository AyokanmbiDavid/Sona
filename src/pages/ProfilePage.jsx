import { Coins, Link } from 'lucide-react'
import React from 'react'

const ProfilePage = () => {
  return (
    <>
        <div className="w-full">
            <div className="w-full flex dark:text-white justify-between items-center">
                <div className="text-xs p-2 flex justify-center gap-2 items-center">
                    Points: <span className='rounded-full bg-green-200 dark:bg-green-800 flex justify-between gap-2 items-center p-2'>
                        <div className="text-green-800 dark:text-green-300 font-bold">3000</div>
                        <Coins size={13} /></span>
                </div>

                {/* connect button */}
                <button
                className='flex justify-between gap-3 items-center text-white bg-blue-800 rounded-md cursor-pointer text-xs p-2'>
                    connect <Link size={13} />
                </button>
            </div>

            {/* daily claim */}
            <div className="p-2 flex gap-3 items-center dark:text-white">
                <h1 className="text-xs">Daily claim</h1>

                <button
                className='flex  p-2 text-xs cursor-pointer rounded-full bg-blue-800 text-white font-bold'>
                    claim +20</button>
            </div>
        </div>
    </>
  )
}

export default ProfilePage
