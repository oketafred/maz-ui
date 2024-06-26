import { IdleTimeout, useIdleTimeout } from '@modules/index'

it('useIdleTimeout should create an instance of IdleTimeout', () => {
  const callback = vitest.fn()
  const options = { timeout: 10_000 }
  const idle = useIdleTimeout({ callback, options })

  expect(idle).toBeInstanceOf(IdleTimeout)
  // @ts-expect-error - test case
  expect(idle.callback).toBe(callback)
  // @ts-expect-error - test case
  expect(idle.options).toEqual({
    element: undefined,
    immediate: true,
    once: false,
    timeout: 10_000,
  })
})

it('useIdleTimeout should default options to an empty object if not provided', () => {
  const callback = vitest.fn()
  const idle = useIdleTimeout({ callback })
  // @ts-expect-error - test case
  expect(idle.options).toEqual({
    element: undefined,
    immediate: true,
    once: false,
    timeout: 300_000,
  })
})
