
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    readonly HOST: string
    readonly PORT: number
  }
}
