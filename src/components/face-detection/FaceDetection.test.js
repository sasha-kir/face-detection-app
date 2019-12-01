import React from 'react';
import { mount, shallow } from 'enzyme';
import FaceDetection from './FaceDetection';

describe('FaceDetection', () => {
    it('renders correctly', () => {
        const component = shallow(<FaceDetection boundingBoxes={[]} imageToDisplay="" />);
        expect(component).toMatchSnapshot();
    });
    it('does not display image when url is empty', () => {
        const component = shallow(<FaceDetection boundingBoxes={[]} imageToDisplay="" />);
        expect(component.exists('#input-image')).toBeFalsy();
    });
    it('displays image when url is provided', () => {
        const url = 'https://picsum.photos/500/';
        const component = shallow(<FaceDetection boundingBoxes={[]} imageToDisplay={url} />);
        const source = component.find('#input-image').prop('src');
        expect(source).toBe(url);
    });
    it('renders one bounding box', () => {
        const boxes = [ { leftCol: 0, rightCol: 0, topRow: 0, bottomRow: 0 } ];
        const url = 'https://picsum.photos/500/';
        const component = shallow(<FaceDetection boundingBoxes={boxes} imageToDisplay={url} />);
        expect(component.find('.bounding-box')).toHaveLength(1);
    });
    it('renders multiple bounding boxes', () => {
        const boxes = [ { leftCol: 0, rightCol: 0, topRow: 0, bottomRow: 0 },
                        { leftCol: 0.5, rightCol: 0.5, topRow: 0.5, bottomRow: 0.5 } 
                      ];
        const url = 'https://picsum.photos/500/';
        const component = shallow(<FaceDetection boundingBoxes={boxes} imageToDisplay={url} />);
        expect(component.find('.bounding-box')).toHaveLength(2);
    });
});