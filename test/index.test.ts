import { describe, it, expect } from 'vitest'

describe('vitest smoke', () => {
  it('runs a normal unit test', () => {
    expect(1 + 1).toBe(2)
  })

  it('has test mode enabled while running tests', () => {
    expect(process.env.NODE_ENV).toBe('test')
  })
})
