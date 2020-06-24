import React from 'react';
//shallow는 Component를 가상으로 렌더링 해주는 함수. 다만, 자식 Component를 렌더링하지 않음.
//mount는 shallow와 비슷하지만 자식 Component를 렌더링 해줌
import {shallow, mount} from 'enzyme'; 
import App from './App';
import Main from './Main';
import Profile from './Profile';
import Fortune from './Fortune';
import {MemoryRouter} from 'react-router-dom'; //테스트 환경에서는 브라우저가 없으므로, 메모리 상에서 Router를 작동시키는 MemoryRouter를 이용하여 Routing이 제대로 작동하지는 테스트가 가능함.

//jest.mock을 이용하여 다른 Component를 모방한 단순한 컴포넌트를 만들어줘야함.
jest.mock('./Main', () => {return ((props) => <div id="main"> MockMain </div>);});
jest.mock('./Profile', () => () => 'mock');
jest.mock('./Fortune', () => () => 'mock');

describe('App', () => {
  it ('should render without errors', () => {
    const component = shallow(<App/>);
    const wrapper = component.find(".App");
    expect(wrapper.length).toBe(1);
    //expect(actual: 우리가 얻은 값).match(expected:우리가 바라는 값) match는 jest.io에서 확인
  });
  
  //localhost:3000/main이 Main 컴포넌트를 렌더링 하는지 테스트
  it ('should render main with "/main"', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/main']}>
        <App/>
      </MemoryRouter>
    );
    expect(component.find(Main)).toHaveLength(1);
    expect(component.find('#main').length).toBe(1);
  });

  it ('should render profile with "/profile"', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/profile']}>
        <App/>
      </MemoryRouter>
    );
    expect(component.find(Profile)).toHaveLength(1);
  });

  it ('should goto main when clicking main link', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/foo']}>
      <App/>
      </MemoryRouter>
    );
    const wrapper = component.find('#main-link');
    wrapper.first().simulate('click', {button: 0});
    component.update();
    expect(component.find(Main)).toHaveLength(1);
  });


  it ('should render fortune with "/fortune/..."', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/fortune/TA&1993-10-10']}>
      <App/>
      </MemoryRouter>
    );
    expect(component.find(Fortune)).toHaveLength(1);
  });

  it ('should redirect "/" to "/main"', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/']}>
      <App/>
      </MemoryRouter>
    );
    expect(component.find(Main)).toHaveLength(1);
  });


  it ('should render 404 page with wrong address', () => {
    const component = mount(
      <MemoryRouter initialEntries={['/TAzzang']}>
      <App/>
      </MemoryRouter>
    );
    expect(component.contains(<div>404 Not Found</div>)).toBe(true);
  });

});
