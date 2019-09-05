import React from 'react';
import {act} from 'react-dom/test-utils';  
import { mount } from 'enzyme';
import nock from 'nock';
import waitUntil from 'async-wait-until';
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from '../alert-template/react-alert-custom-template';

import SignIn from './SignIn';

const loadUser = jest.fn();
const onRouteChange = jest.fn();

describe('SignIn', () => {
    let component;

    beforeEach(() => {
        component = mount(
            <AlertProvider template={AlertTemplate}>
                <SignIn onRouteChange={onRouteChange} 
                        loadUser={loadUser} />
            </AlertProvider>);
    });

    afterEach(() => {
        component.unmount();
        nock.cleanAll();
    });

    it('renders correctly', () => {
        const wrapper= mount(<SignIn />);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });
    it('saves username and password to state', () => {
        const form = component.find('SignIn');
        const usernameInput = component.find('input#username').at(0);
        const passInput = component.find('input#password').at(0);

        usernameInput.instance().value = "amy@gmail.com";
        usernameInput.simulate('change');
        expect(form.state('username')).toBe("amy@gmail.com");

        passInput.instance().value = "secret";
        passInput.simulate('change');
        expect(form.state('password')).toBe("secret");
    });
    it('submits on button click', () => {
        const form = component.find('SignIn');
        act(() => {
            form.setState({ username: "amy@gmail.com" });
            form.setState({ password: "secret" });
        });
        form.find('button').simulate('click');
        expect(form.state('dataSubmitted')).toBeTruthy();
    });
    it('submits on Enter in password field', () => {
        const form = component.find('SignIn');
        act(() => {
            form.setState({ username: "amy@gmail.com" });
            form.setState({ password: "secret" });
        });
        form.find('input#password').simulate('keydown', { key: 'Enter' });
        expect(form.state('dataSubmitted')).toBeTruthy();
    });
    it('handles empty fields on submit', () => {
        const form = component.find('SignIn');
        const button = form.find('button');

        button.simulate('click');
        expect(form.state('dataSubmitted')).toBeFalsy();

        act(() => {
            form.setState({ username: "amy@gmail.com" });
            form.setState({ password: "" });
        });

        button.simulate('click');
        expect(form.state('dataSubmitted')).toBeFalsy();

        act(() => {
            form.setState({ username: "" });
            form.setState({ password: "secret" });
        });
        button.simulate('click');
        expect(form.state('dataSubmitted')).toBeFalsy();
    });
    it('sends data to server and handles response 200', async(done) => {
        const mockUser = { id: 1, name: "Amy", email: "amy@gmail.com", entries: 0, joined: "" };

        nock('http://localhost:3001')
            //.log(console.log)
            .persist()
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post('/sign-in', {username: 'amy@gmail.com', password: 'secret'})
            .reply(200, mockUser);
        
        const form = component.find('SignIn');
        act(() => {
            form.setState({ username: "amy@gmail.com" });
            form.setState({ password: "secret" });
        });
        form.find('button').simulate('click');
        await act(async() => {
            await waitUntil(() => form.state('dataReceived') !== null);
        });
        expect(form.state('dataReceived')).toBeTruthy();
        expect(loadUser).toHaveBeenCalledWith(mockUser);
        expect(onRouteChange).toHaveBeenCalledWith('home');
        done();
    });
    it('handles error response from server', async(done) => {
        nock('http://localhost:3001')
            //.log(console.log)
            .persist()
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post('/sign-in', {username: 'amy@gmail.com', password: 'secret'})
            .reply(400);

        const form = component.find('SignIn');
        act(() => {
            form.setState({ username: "amy@gmail.com" });
            form.setState({ password: "secret" });
        });
        form.find('button').simulate('click');
        await act(async() => {
            await waitUntil(() => form.state('dataReceived') !== null);
        });
        expect(form.state('dataReceived')).toBe(false);
        done();
    });
});