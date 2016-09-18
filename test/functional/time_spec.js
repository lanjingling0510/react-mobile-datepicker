
import { expect } from 'chai';
import { nextYear, nextMonth, nextDate, getTime } from '../../lib/time.js';


describe('time.js', () => {

    describe('nextYear', () => {
        it('should return correct parameter', function () {
            expect(() => nextYear(undefined, -1)).to.throw('参数类型不对');
            expect(() => nextYear(4345345)).to.throw('参数类型不对');
        });

        it("should return last year, when 'index = -1'", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2009, 2, 7);
            expect(nextYear(date, -1).getTime()).to.equal(expectDate.getTime());
        });

        it("should return this year, when 'index = 0'", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 7);
            expect(nextYear(date, 0).getTime()).to.equal(expectDate.getTime());
            expect(nextYear(date).getTime()).to.equal(expectDate.getTime());
        });

        it("should return next year, when 'index = 1'", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2011, 2, 7);
            expect(nextYear(date, 1).getTime()).to.equal(expectDate.getTime());
        });
    });

    describe('nextMonth', () => {
        it('should return correct parameter', function () {
            expect(() => nextMonth(undefined, -1)).to.throw('参数类型不对');
            expect(() => nextMonth(4345345)).to.throw('参数类型不对');
        });

        it("should return last month, when 'index = -1'", function() {
            const date = new Date(2010, 1, 28);
            const expectDate = new Date(2010, 0, 28);
            expect(nextMonth(date, -1).getTime()).to.equal(expectDate.getTime());
        });

        it("should return this month, when 'index = 0'", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 7);
            expect(nextMonth(date, 0).getTime()).to.equal(expectDate.getTime());
            expect(nextMonth(date).getTime()).to.equal(expectDate.getTime());
        });

        it("should return next month, when 'index = 1'", function() {
            const date = new Date(2010, 0, 31);
            const expectDate = new Date(2010, 1, 28);
            expect(nextMonth(date, 1).getTime()).to.equal(expectDate.getTime());
        });
    });

    describe('nextDate', () => {
        it('should return correct parameter', function () {
            expect(() => nextDate(undefined, -1)).to.throw('参数类型不对');
            expect(() => nextDate(4345345)).to.throw('参数类型不对');
        });

        it("should return last date, when 'index = -1'", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 6);
            expect(nextDate(date, -1).getTime()).to.equal(expectDate.getTime());
        });

        it("should return this date, when 'index = 0'", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 7);
            expect(nextDate(date, 0).getTime()).to.equal(expectDate.getTime());
            expect(nextDate(date).getTime()).to.equal(expectDate.getTime());
        });

        it("should return next date, when 'index = 1'", function() {
            const date = new Date(2010, 2, 7);
            const expectDate = new Date(2010, 2, 8);
            expect(nextDate(date, 1).getTime()).to.equal(expectDate.getTime());
        });
    });
})
