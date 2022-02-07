declare namespace NodeJS {
  interface ProcessEnv {
    MODE: 'development' | 'production'
    readonly HOST: string
    readonly PORT: number
  }
}
