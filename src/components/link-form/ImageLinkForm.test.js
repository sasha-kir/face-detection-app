import React from 'react';
import { mount, shallow } from 'enzyme';
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from '../alert-template/react-alert-custom-template';

import ImageLinkForm from './ImageLinkForm';
import { url } from 'inspector';

const inputFunc = jest.fn();
const submitFunc = jest.fn();

describe('ImageLinkForm', () => {
  it('renders correctly', () => {
    const component = shallow(<ImageLinkForm onInputChange={inputFunc} onImageSubmit={submitFunc} />);
    expect(component).toMatchSnapshot();
  });

  it('sends input to App', () => {
    const component = mount(<ImageLinkForm onInputChange={inputFunc} 
                                             onImageSubmit={submitFunc} />);
    component.find('input').simulate('change');
    expect(inputFunc).toHaveBeenCalled();
    component.unmount();
  });

  it('handles valid url', () => {
    const component = mount(
        <AlertProvider template={AlertTemplate}>
            <ImageLinkForm onInputChange={inputFunc} 
                           onImageSubmit={submitFunc} />
        </AlertProvider>);

    const form = component.find('ImageLinkForm');
    
    const urls = [
        "http://example.com/image.jpg",
        "https://www.example.ru/a+b+c/image.png",
        "http://example.es/a-b/c/image.gif"
    ]

    const urlInput = component.find('input').at(0);

    for (url of urls) {
        urlInput.instance().value = url;
        form.find('button#fwd-btn').simulate('click');
        expect(form.state('isUrlValid')).toBeTruthy();
    }

    component.unmount();

  });

  it('handles invalid url', () => {
    const component = mount(
        <AlertProvider template={AlertTemplate}>
            <ImageLinkForm onInputChange={inputFunc} 
                           onImageSubmit={submitFunc} />
        </AlertProvider>);

    const form = component.find('ImageLinkForm');
    
    const urls = [
        "",
        "1234",
        "http://example.com/image"
    ]

    const urlInput = component.find('input').at(0);

    for (url of urls) {
        urlInput.instance().value = url;
        form.find('button#fwd-btn').simulate('click');
        expect(form.state('isUrlValid')).toBeFalsy();
    }

    component.unmount();
  });

  it('submits url on button click', () => {
    const component = mount(<ImageLinkForm onInputChange={inputFunc} 
                                           onImageSubmit={submitFunc} />);

    const urlInput = component.find('input').at(0);
    urlInput.instance().value = "http://example.com/image.jpg";

    component.find('button').simulate('click');
    
    expect(submitFunc).toHaveBeenCalled();
    component.unmount();
  });

  it('submits url on Enter', () => {
    const component = mount(<ImageLinkForm onInputChange={inputFunc} 
                                           onImageSubmit={submitFunc} />);

    const urlInput = component.find('input').at(0);
    urlInput.instance().value = "http://example.com/image.jpg";

    component.find('input').simulate('keydown', { keyCode: 13 });
    
    expect(submitFunc).toHaveBeenCalled();
    component.unmount();
  });
});