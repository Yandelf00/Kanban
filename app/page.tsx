import Image from 'next/image'
import { Switch, Phrase, Navbar, Sidebar, Navtwo, Slidtwo, Answitch, Board, Columns } from '@/components'


export default function Home() {
  return (
    <main className="h-full w-full bg-[rgba(244,247,253,255)]  dark:bg-[rgba(32,33,44,255)] overflow-y-auto">
      <Navbar/>
      <div className='flex flex-row'>
        <Sidebar/>
        <div className='ml-[5rem] h-full mt-[7rem]'>
          <Columns/>
        </div>
      </div>

      
    </main>
  )
}
