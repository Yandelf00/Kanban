import Image from 'next/image'
import { Switch } from '@/components'


export default function Home() {
  return (
    <main className="">
      <div className='text-[3rem]'>hello world</div>
      <div className='text-[3rem] dark:text-slate-600'>this is something else</div>
      <Switch/>
    </main>
  )
}
