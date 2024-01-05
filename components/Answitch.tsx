"use client"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
interface AnswitchProps {
    toggleTheme: boolean;
}
export default function Answitch({toggleTheme} : AnswitchProps) {
    const [mounted, setMounted] = useState(false)
    const [toggle, setToggle] = useState(false)
    const { theme, setTheme } = useTheme()
  
    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
      setMounted(true)
    }, [])
    useEffect(() => {
        if (mounted) {
          if (theme === "dark") {
            setTheme("light")
          } else {
            setTheme("dark")
          }
        }
      }, [toggleTheme, theme])
    if (!mounted) {
      return null
    }
  
    return (
      <div className='mb-10'>
        <div onClick={() => setToggle(!toggle)} className={`flex h-6 w-12 cursor-pointer rounded-full border 
        ${toggle ? 'justify-start' : 'justify-end'} bg-[rgba(99,95,199,255)] 
        border-[rgba(99,95,199,255)] hover:bg-[rgb(146,143,232)] p-[1px]`}>
        <motion.div
          layout
          initial={{ borderRadius: '50%', background: 'black' }}
          animate={{
            background: toggle ? 'white' : 'white',
          }}
          transition={{ type: 'spring', stiffness: 700, damping: 70 }}
          className={`h-5 w-5 rounded-full`}
        />
        </div>
      </div>
    )
}
