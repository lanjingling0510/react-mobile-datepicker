var chai = require('chai');
var expect = chai.expect;
import { nextTime, getTimeName } from '../../lib/time.js';


describe('nextTime函数', () => {
    it('参数类型不对', function () {
        const now = 1466654887871;
        expect(function(){ nextTime(1466654887871) }).to.throw('参数类型不对');
    });

    it("参数2015.5.31应该返回2016.6.1", function() {
        const now = new Date(2016, 4, 31);
        expect(nextTime(now).getTime()).to.equal(new Date(2016, 5, 1).getTime());
    });
    it("参数2015.5.31应该返回2016.6.1", function() {
        const now = new Date(2016, 4, 31);
        expect(nextTime(now, 1).getTime()).to.equal(new Date(2016, 5, 1).getTime());
    });

    it("参数2015.6.1应该返回2016.5.31", function() {
        const now = new Date(2016, 5, 1);
        expect(nextTime(now, -1).getTime()).to.equal(new Date(2016, 4, 31).getTime());
    });
});

describe('getTimeName函数', () => {
    it('参数类型不对', function () {
        const now = 1466654887871;
        expect(function(){ getTimeName(1466654887871) }).to.throw('参数类型不对');
    });

    it('应该返回昨天', () => {
        const data = nextTime(new Date(), -1);
        expect(getTimeName(data)).to.equal('昨天');
    })

    it('应该返回今天', () => {
        const data = new Date();
        expect(getTimeName(data)).to.equal('今天');
    })

    it('应该返回2016-5-10', () => {
        const data = new Date(2016, 4, 10);
        expect(getTimeName(data)).to.equal('2016-5-10');
    })
});
