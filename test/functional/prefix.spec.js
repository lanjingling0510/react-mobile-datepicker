
import { expect } from 'chai';
import { formatCss, addPrefixCss } from '../../lib/prefix.js';


describe('prefix.js', () => {

    describe('formatCss', () => {
        it('should return correct formated css property when contain "transform"', function () {
            const date = {
                transform: 'translate(100px, 100px, 100px)',
                margin: '10px',
            };

            expect(formatCss(date)).to.eql({
                WebkitTransform: 'translate(100px, 100px, 100px)',
                MozTransform: 'translate(100px, 100px, 100px)',
                MsTransform: 'translate(100px, 100px, 100px)',
                transform: 'translate(100px, 100px, 100px)',
                margin: '10px',
            });
        });

        it('should return correct formated css property when contain "transition"', function () {
            const date = {
                transition: 'transform 2s',
                padding: 0,
                margin: '10px',
            };

            expect(formatCss(date)).to.eql({
                WebkitTransition: '-webkit-transform 2s',
                MozTransition: '-moz-transform 2s',
                MsTransition: '-ms-transform 2s',
                transition: 'transform 2s',
                padding: 0,
                margin: '10px',
            });
        });
    });

    describe('addPrefixCss', () => {
        it('should set correct style', () => {
            const mock = {
                style: {}
            };

            const props = {
                transition: 'transform 2s',
                padding: 0,
                margin: '10px',
            };

            addPrefixCss(mock, props);

            expect(mock.style).to.eql({
                WebkitTransition: '-webkit-transform 2s',
                MozTransition: '-moz-transform 2s',
                MsTransition: '-ms-transform 2s',
                transition: 'transform 2s',
                padding: 0,
                margin: '10px',
            });
        });
    });
})
