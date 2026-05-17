import { useState } from 'react'
import UpdateElectron from '@/components/update'
import logoVite from './assets/logo-vite.svg'
import logoElectron from './assets/logo-electron.svg'

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className='min-h-screen px-4 py-8 text-slate-100 sm:px-6 lg:px-8'>
      <div className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
        <section className='overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 shadow-2xl shadow-cyan-950/30 backdrop-blur'>
          <div className='grid gap-8 p-6 md:grid-cols-[1.15fr_0.85fr] md:p-10'>
            <div className='flex flex-col justify-between gap-8'>
              <div className='space-y-6'>
                <div className='inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.28em] text-cyan-200'>
                  Electron Vite React
                </div>
                <div className='space-y-4'>
                  <h1 className='max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
                    A sharp starter with Tailwind-first styling.
                  </h1>
                  <p className='max-w-2xl text-base leading-7 text-slate-300 sm:text-lg'>
                    The layout, update panel, and global styles now all run through Tailwind classes instead of legacy CSS files.
                  </p>
                </div>
              </div>

              <div className='flex flex-wrap items-center gap-3'>
                <a
                  href='https://github.com/electron-vite/electron-vite-react'
                  target='_blank'
                  rel='noreferrer'
                  className='inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-cyan-400/40 hover:bg-white/10'
                >
                  <span className='relative flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/80 ring-1 ring-white/10'>
                    <img src={logoVite} className='h-8 w-8' alt='Vite logo' />
                    <img
                      src={logoElectron}
                      className='absolute h-8 w-8 motion-safe:animate-spin [animation-duration:20s]'
                      alt='Electron logo'
                    />
                  </span>
                  <span className='text-sm font-medium text-slate-200'>Open project repository</span>
                </a>
                <div className='rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200'>
                  Tailwind v4 via Vite plugin
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center rounded-[1.75rem] border border-white/10 bg-white/5 p-6'>
              <div className='space-y-4'>
                <div className='text-sm uppercase tracking-[0.3em] text-slate-400'>Counter demo</div>
                <div className='text-5xl font-semibold text-white'>{count}</div>
                <button
                  onClick={() => setCount((value) => value + 1)}
                  className='inline-flex items-center justify-center rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950'
                >
                  Increment counter
                </button>
                <p className='text-sm leading-6 text-slate-300'>
                  Edit <code>src/App.tsx</code> and save to test HMR.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className='grid gap-4 md:grid-cols-2'>
          <div className='rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200 shadow-lg shadow-slate-950/20'>
            <div className='text-sm uppercase tracking-[0.3em] text-slate-400'>Public assets</div>
            <p className='mt-3 text-base leading-7'>
              Place static files into the <code>/public</code> folder.
            </p>
          </div>
          <div className='rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-cyan-400/10 p-6 text-slate-200 shadow-lg shadow-slate-950/20'>
            <div className='text-sm uppercase tracking-[0.3em] text-slate-400'>Update panel</div>
            <p className='mt-3 text-base leading-7'>
              The built-in updater UI also moved to Tailwind class names so the codebase is consistent end to end.
            </p>
          </div>
        </section>

        <UpdateElectron />
      </div>
    </div>
  )
}

export default App