import Image from 'next/image'
import { Switch, Phrase, Navbar } from '@/components'


export default function Home() {
  return (
    <main className="w-full">
      <Navbar/>
      <div className='mt-10'>
        <Switch/>
      </div>
    </main>
  )
}
