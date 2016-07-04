
import { expect } from 'chai';
import { nextYear, nextMonth, nextDate, getTime } from '../../lib/time.js';


describe('time.js测试', () => {

    describe('nextYear函数', () => {
        it('参数类型不对', function () {
            expect(() => nextYear(undefined, -1)).to.throw('参数类型不对');
            expect(() => nextYear(4345345)).to.throw('参数类型不对');
        });

        it("index = -1 应该返回上一年日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2009, 2, 7);
            expect(nextYear(date, -1).getTime()).to.equal(expectDate.getTime());
        });

        it("index = 0 应该返回当天日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 7);
            expect(nextYear(date, 0).getTime()).to.equal(expectDate.getTime());
            expect(nextYear(date).getTime()).to.equal(expectDate.getTime());
        });

        it("index = 1 应该返回下一年日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2011, 2, 7);
            expect(nextYear(date, 1).getTime()).to.equal(expectDate.getTime());
        });
    });

    describe('nextMonth函数', () => {
        it('参数类型不对', function () {
            expect(() => nextMonth(undefined, -1)).to.throw('参数类型不对');
            expect(() => nextMonth(4345345)).to.throw('参数类型不对');
        });

        it("index = -1 应该返回上个月日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 1, 7);
            expect(nextMonth(date, -1).getTime()).to.equal(expectDate.getTime());
        });

        it("index = 0 应该返回当天日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 7);
            expect(nextMonth(date, 0).getTime()).to.equal(expectDate.getTime());
            expect(nextMonth(date).getTime()).to.equal(expectDate.getTime());
        });

        it("index = 1 应该返回下个月日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 3, 7);
            expect(nextMonth(date, 1).getTime()).to.equal(expectDate.getTime());
        });
    });

    describe('nextDate函数', () => {
        it('参数类型不对', function () {
            expect(() => nextDate(undefined, -1)).to.throw('参数类型不对');
            expect(() => nextDate(4345345)).to.throw('参数类型不对');
        });

        it("index = -1 应该返回上一天日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 6);
            expect(nextDate(date, -1).getTime()).to.equal(expectDate.getTime());
        });

        it("index = 0 应该返回当天日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 7);
            expect(nextDate(date, 0).getTime()).to.equal(expectDate.getTime());
            expect(nextDate(date).getTime()).to.equal(expectDate.getTime());
        });

        it("index = 1 应该返回下一下日期", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 8);
            expect(nextDate(date, 1).getTime()).to.equal(expectDate.getTime());
        });
    });

    describe('getTime函数', () => {
        it('date参数类型不对', function () {
            const date = new Date(2010, 2, 7);
            expect(() => getTime(date, 'month')).to.throw('类型不对');
        });

        it('type = Year 应该返回{ value: 2010, suffix: 年 }', function () {
            const date = new Date(2010, 2, 7);
            expect(getTime(date, 'Year')).to.deep.equal({ value: 2010, suffix: '年' });
        });

        it('type = Month 应该返回{ value: 3, suffix: 月 }', function () {
            const date = new Date(2010, 2, 7);
            expect(getTime(date, 'Month')).to.deep.equal({ value: 3, suffix: '月' });
        });

        it('type = Date 应该返回{ value: 7, suffix: 日 }', function () {
            const date = new Date(2010, 2, 7);
            expect(getTime(date, 'Date')).to.deep.equal({ value: 7, suffix: '日' });
        });
    });

})
