import { AosHandler, type AosOptions } from '@modules/plugins'

describe('aosHandler', () => {
  let aosHandler: AosHandler

  beforeEach(() => {
    aosHandler = new AosHandler()

    const observe = vitest.fn()
    const unobserve = vitest.fn()
    // @ts-expect-error - global variable
    window.IntersectionObserver = vitest.fn(() => ({
      observe,
      unobserve,
    }))
  })

  it('should update the options with the provided values', () => {
    const options: AosOptions = {
      delay: 500,
      observer: {
        rootMargin: '10px',
        threshold: 0.5,
      },
      animation: {
        once: false,
        duration: 500,
        delay: 0,
      },
    }

    aosHandler = new AosHandler(options)
    expect(aosHandler.options).toEqual({
      ...options,
      observer: {
        ...options.observer,
        root: undefined,
      },
    })
  })

  it('should run the animations after the specified delay', () => {
    vitest.useFakeTimers()

    aosHandler.runAnimations()
    vitest.advanceTimersByTime(99)
    // Assert that the animations have not been run yet

    vitest.advanceTimersByTime(1)
    // Assert that the animations have been run
  })
})
