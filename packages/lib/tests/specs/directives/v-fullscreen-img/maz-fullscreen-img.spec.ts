import MazFullscreenImg from '@modules/directives/v-fullscreen-img/MazFullscreenImg.vue'
import { shallowMount } from '@vue/test-utils'

const image = document.createElement('img')

// @ts-expect-error - test case
image.animate = () => {}

const defaultProperties = {
  clickedElement: image,
  scaleAnimation: false,
}

describe('mazFullscreenImg', () => {
  it('should render correctly when opened', async () => {
    const wrapper = shallowMount(MazFullscreenImg, {
      props: {
        src: 'https://via.placeholder.com/150',
        alt: 'placeholder image',
        openInstanceClass: 'zv-open',
        destroy: () => {},
        ...defaultProperties,
      },
    })

    await wrapper.vm.$nextTick()

    expect(wrapper.find('.m-fullscreen-img-loader').isVisible()).toBe(true)
    expect(wrapper.find('.m-fullscreen-btn').exists()).toBe(true)
  })

  it('should render correctly with an alternative text', async () => {
    const alt = 'alternative text'

    const wrapper = shallowMount(MazFullscreenImg, {
      props: {
        src: 'https://via.placeholder.com/150',
        alt,
        openInstanceClass: 'zv-open',
        destroy: () => {},
        ...defaultProperties,
      },
    })

    await wrapper.vm.$nextTick()

    // expect(wrapper.find('.m-fullscreen-img-wrapper').isVisible()).toBe(true)
    expect(wrapper.find('img').attributes('alt')).toBe(alt)
  })

  // test('should close the component and destroy it correctly', async () => {
  //   const destroy = vi.fn()

  //   const wrapper = shallowMount(MazFullscreenImg, {
  //     props: {
  //       src: 'https://via.placeholder.com/150',
  //       alt: 'placeholder image',
  //       openInstanceClass: 'zv-open',
  //       destroy,
  //       ...defaultProperties,
  //     },
  //   })

  //   await wrapper.find('.m-fullscreen-btn.--close').trigger('click')

  //   expect(wrapper.emitted('before-close')).toBeTruthy()
  // })
})
