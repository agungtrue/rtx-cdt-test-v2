import { shallowMount, render, mount, flushPromises } from '@vue/test-utils';
import axios from 'axios'
import About from '../../src/views/About.vue';
import propertyList from '../../src/mock/propertyList';

jest.spyOn(axios, 'get').mockResolvedValue(propertyList)

describe('About page', () => {
  it('renders a classes that contain .about class', async () => {
    const wrapper = mount(About);
    expect(wrapper.classes()).toContain('about');
    expect(wrapper.classes('about')).toBe(true);
  });
});

describe('table rendered', () => {
  it('should render table', async () => {
    // const wrapper = mount(About);

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/property?offset=0&limit=5')


    // Wait until the DOM updates.
    await flushPromises();

    // Finally, we make sure we've rendered the content from the API.
    // const posts = wrapper.findAll('')

    // expect(posts).toHaveLength(2)
    // expect(posts[0].text()).toContain('title1')
    // expect(posts[1].text()).toContain('title2')
  });
});
