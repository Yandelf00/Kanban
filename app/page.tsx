import Image from 'next/image'
import { Switch, Phrase, Navbar, Sidebar, Answitch } from '@/components'


export default function Home() {
  return (
    <main className="w-full h-full overflow-y-hidden">
      <Navbar/>
      <div className='h-[100%] w-full bg-[rgba(244,247,253,255)] dark:bg-[rgba(34,35,46,255)]'>
        <Sidebar/>

        {/* <div className='mt-10'>
          <Switch/>
        </div> */}
      </div>
    </main>
  )
}
