import Image from 'next/image'
import { Switch, Phrase } from '@/components'


export default function Home() {
  return (
    <main className="">
      <div className='text-[3rem]'>hello world</div>
      <div className='text-[3rem] text-green-500 dark:text-red-500'>this is something else</div>
      <Phrase/>
      <Switch/>
      
    </main>
  )
}
