
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    readonly PORT: string
    readonly HOST: string
    readonly PORT: number
    readonly PORT_WS: number
  }
}
