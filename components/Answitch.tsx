"use client"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export default function Answitch() {
    const [mounted, setMounted] = useState(false)
    const [toggle, setToggle] = useState(false)
    const { theme, setTheme } = useTheme()
  
    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
      setMounted(true);
      setToggle(theme === 'light'); 
    }, []);
    
    if (!mounted) {
      return null
    }
    
    const handleThemeToggle = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setToggle(!toggle);
      setTheme(newTheme);
    };
    return (
      <div className=''>
        <div onClick={handleThemeToggle} className={`flex h-6 w-12 cursor-pointer rounded-full border 
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
