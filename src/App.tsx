import { useState } from 'react'
import UpdateElectron from '@/components/update'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'
import logoTailwind from './assets/logo-tailwindcss.svg'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className='relative min-h-screen overflow-hidden bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute -left-28 top-10 h-96 w-96 rounded-full bg-cyan-200/50 blur-3xl' />
        <div className='absolute -right-24 top-28 h-96 w-96 rounded-full bg-sky-200/40 blur-3xl' />
        <div className='absolute bottom-0 left-1/2 h-72 w-[46rem] -translate-x-1/2 bg-gradient-to-r from-cyan-200/0 via-cyan-300/45 to-cyan-200/0 blur-3xl' />
      </div>

      <div className='relative mx-auto flex w-full max-w-6xl flex-col gap-8'>
        <section className='overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 shadow-[0_24px_70px_-40px_rgba(14,116,144,0.35)] backdrop-blur'>
          <div className='grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-10'>
            <div className='flex flex-col justify-between gap-8'>
              <div className='space-y-6'>
                <div className='inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.24em] text-cyan-800'>
                  Electron + Vite + React + Tailwind
                </div>
                <div className='space-y-4'>
                  <h1 className='max-w-xl text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl'>
                    Modern starter, cleaner rhythm, unified visual language.
                  </h1>
                  <p className='max-w-2xl text-base leading-7 text-slate-600 sm:text-lg'>
                    Refined spacing, balanced contrast, and consistent cards make the page feel more polished while keeping all demo functionality intact.
                  </p>
                </div>
              </div>

              <a
                href='https://github.com/electron-vite/electron-vite-react'
                target='_blank'
                rel='noreferrer'
                className='group inline-flex w-fit items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-cyan-300 hover:shadow-md'
              >
                <span className='relative flex h-10 w-10 items-center justify-center'>
                  <img src={logoVite} className='h-8 w-8' alt='Vite logo' />
                  <img
                    src={logoElectron}
                    className='absolute h-8 w-8 motion-safe:animate-spin [animation-duration:20s]'
                    alt='Electron logo'
                  />
                </span>
                <span className='pr-2 text-sm font-semibold text-slate-700 transition-colors group-hover:text-cyan-700'>
                  Open project repository
                </span>
              </a>
            </div>

            <div className='relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-cyan-50 to-white p-6'>
              <div className='pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-200/60 blur-2xl' />
              <div className='relative space-y-4'>
                <div className='flex items-center justify-between'>
                  <div className='text-sm uppercase tracking-[0.3em] text-slate-500'>Counter demo</div>
                  <img src={logoTailwind} className='h-6 w-6 opacity-90' alt='Tailwind CSS logo' />
                </div>
                <div className='text-5xl font-semibold text-slate-900'>{count}</div>
                <button
                  onClick={() => setCount((value) => value + 1)}
                  className='inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-white'
                >
                  Increment counter
                </button>
                <p className='text-sm leading-6 text-slate-600'>
                  Edit <code>src/App.tsx</code> and save to test HMR.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='grid gap-4 md:grid-cols-3'>
          <div className='rounded-3xl border border-slate-200 bg-white p-6 text-slate-800 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.35)]'>
            <div className='text-sm uppercase tracking-[0.3em] text-slate-500'>Public assets</div>
            <p className='mt-3 text-base leading-7'>
              Place static files into the <code>/public</code> folder.
            </p>
          </div>

          <div className='rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-50 p-6 text-slate-800 shadow-[0_18px_36px_-28px_rgba(14,116,144,0.4)]'>
            <div className='flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-cyan-700'>
              <img src={logoTailwind} className='h-5 w-5' alt='Tailwind CSS logo' />
              Tailwind system
            </div>
            <p className='mt-3 text-base leading-7 text-slate-700'>
              Unified utility classes now drive layout, hierarchy, and component consistency across the app.
            </p>
          </div>

          <div className='rounded-3xl border border-slate-200 bg-white p-6 text-slate-800 shadow-[0_18px_36px_-28px_rgba(15,23,42,0.35)]'>
            <div className='text-sm uppercase tracking-[0.3em] text-slate-500'>Update panel</div>
            <p className='mt-3 text-base leading-7'>
              Built-in updater UI follows the same spacing and typography rules for a more harmonious experience.
            </p>
          </div>
        </section>

        <UpdateElectron />
      </div>
    </div>
  )
}

export default App