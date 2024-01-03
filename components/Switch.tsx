"use client"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function Switch() {
    // const [mounted, setMounted] = useState(false)
    // const { theme, setTheme } = useTheme()
  
    // // useEffect only runs on the client, so now we can safely show the UI
    // useEffect(() => {
    //   setMounted(true)
    // }, [])
  
    // if (!mounted) {
    //   return null
    // }
  
    // return (
    //   <select value={theme} onChange={e => setTheme(e.target.value)}>
    //     <option value="system">System</option>
    //     <option value="dark">Dark</option>
    //     <option value="light">Light</option>
    //   </select>
    // )
    const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div className="grid place-items-center h-screen">
      <div>
        <h1 className="text-7xl font-bold text-center">
          {currentTheme === 'dark' ? 'Dark' : 'Light'}{' '}
          <span className="text-purple-600">Mode</span>
        </h1>
        <p className="dark:text-purple-600 my-8 text-center">
          Click the button below to switch mode
        </p>
        <div className="flex justify-center">
          {currentTheme === 'dark' ? (
            <button
              className="bg-black-700 hover:bg-black w-28 rounded-md border-purple-400 border-2 p-4"
              onClick={() => setTheme('light')}
            >
              {' '}
            </button>
          ) : (
            <button
              className="bg-gray-100 w-28 rounded-md border-purple-400 border-2 p-4 hover:bg-gray-300"
              onClick={() => setTheme('dark')}
            >
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
