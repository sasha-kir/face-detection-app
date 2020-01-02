import React from 'react';
import { act } from 'react-dom/test-utils';  
import { mount } from 'enzyme';
import nock from 'nock';
import waitUntil from 'async-wait-until';
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from '../alert-template/react-alert-custom-template';

import Register from './Register';

const loadUser = jest.fn();
const onRouteChange = jest.fn();

describe('Register', () => {
    let component;

    beforeEach(() => {
        component = mount(
            <AlertProvider template={AlertTemplate}>
                <Register onRouteChange={onRouteChange} 
                          loadUser={loadUser} />
            </AlertProvider>);
    });

    afterEach(() => {
        component.unmount();
        nock.cleanAll();
    });

    it('renders correctly', () => {
        const wrapper= mount(<Register />);
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });
    it('routes to SignIn', () => {
        component.find('#signin-link').simulate('click');
        expect(onRouteChange).toHaveBeenCalledWith('sign-in');
    });
    it('saves name, email and password to state', () => {
        const form = component.find('Register');
        const nameInput = component.find('input#name').at(0);
        const emailInput = component.find('input#email').at(0);
        const passInput = component.find('input#password').at(0);

        nameInput.instance().value = "Amy";
        nameInput.simulate('change');
        expect(form.state('name')).toBe("Amy");

        emailInput.instance().value = "amy@gmail.com";
        emailInput.simulate('change');
        expect(form.state('email')).toBe("amy@gmail.com");

        passInput.instance().value = "secret";
        passInput.simulate('change');
        expect(form.state('password')).toBe("secret");
    });
    it('handles empty fields on submit', () => {
        const form = component.find('Register');
        const button = form.find('button');
        const emailInput = form.find('input#email').at(0);
        
        button.simulate('click');
        expect(form.state('dataSubmitted')).toBeFalsy();

        emailInput.instance().value = "amy@gmail.com";
        emailInput.simulate('change');
        act(() => {
            form.setState({ name: "Amy" });
            form.setState({ password: "" });
        });
        button.simulate('click');
        expect(form.state('dataSubmitted')).toBeFalsy();

        emailInput.instance().value = "amy@gmail.com";
        emailInput.simulate('change');
        act(() => {
            form.setState({ name: "" });
            form.setState({ password: "secret" });
        });
        button.simulate('click');
        expect(form.state('dataSubmitted')).toBeFalsy();
    });
    it('rejects invalid emails', () => {
        const form = component.find('Register');
        act(() => {
            form.setState({ name: "Amy" });
            form.setState({ password: "secret" });
        });
        const emailInput = form.find('input#email').at(0);
        const emails = [
            "",
            "amy@gmail",
            "amy.gmail.com"
        ];
        for (var email of emails) {
            emailInput.instance().value = email;
            emailInput.simulate('change');
            form.find('button').simulate('click');
            expect(form.state('dataSubmitted')).toBeFalsy();
        }
    });
    it('submits on button click', () => {
        const form = component.find('Register');
        const emailInput = form.find('input#email').at(0);
        emailInput.instance().value = "amy@gmail.com";
        emailInput.simulate('change');
        act(() => {
            form.setState({ name: "Amy" });
            form.setState({ password: "secret" });
        });
        form.find('button').simulate('click');
        expect(form.state('dataSubmitted')).toBeTruthy();
    });
    it('submits on Enter in password field', () => {
        const form = component.find('Register');
        const emailInput = form.find('input#email').at(0);
        emailInput.instance().value = "amy@gmail.com";
        emailInput.simulate('change');
        act(() => {
            form.setState({ name: "Amy" });
            form.setState({ password: "secret" });
        });
        form.find('input#password').simulate('keydown', {key: 'Enter'});
        expect(form.state('dataSubmitted')).toBeTruthy();
    });
    it('sends data to server and handles response 200', async (done) => {
        const mockUser = { id: 1, name: "Amy", email: "amy@gmail.com", entries: 0, joined: "" };

        nock('http://localhost:3001')
            //.log(console.log)
            .persist()
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post('/register', {name: 'Amy', email: 'amy@gmail.com', password: 'secret'})
            .reply(200, mockUser);

        const form = component.find('Register');
        const emailInput = form.find('input#email').at(0);
        emailInput.instance().value = "amy@gmail.com";
        emailInput.simulate('change');
        act(() => {
            form.setState({ name: "Amy" });
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
    it('handles error response from server', async (done) => {
        nock('http://localhost:3001')
            //.log(console.log)
            .persist()
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .post('/register', {name: 'Amy', email: 'amy@gmail.com', password: 'secret'})
            .reply(400);

        const form = component.find('Register');
        const emailInput = form.find('input#email').at(0);
        emailInput.instance().value = "amy@gmail.com";
        emailInput.simulate('change');
        act(() => {
            form.setState({ name: "Amy" });
            form.setState({ password: "secret" });
        });
        form.find('button').simulate('click');
        await act(async() => {
            await waitUntil(() => form.state('dataReceived') !== null);
        });
        expect(form.state('dataReceived')).toBe(false);
        done();
    });
})
