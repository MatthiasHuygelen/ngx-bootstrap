import { TestBed, waitForAsync } from '@angular/core/testing';
import { BsDatepickerModule } from '../bs-datepicker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsCustomDates } from '../themes/bs/bs-custom-dates-view.component';
import { checkBsValue, checkRangesWithMaxDate } from '../utils/bs-calendar-utils';
import { copyTime } from '../utils/copy-time-utils';

const ranges:  BsCustomDates[] = [{
  label: '',
  value: [new Date, new Date(new Date().setDate(new Date().getDate() + 7))]
}];
const values: Date[] = [new Date(), new Date(new Date().setDate(new Date().getDate() + 7))];

describe('daterangepicker:', () => {
  beforeEach(
    waitForAsync(() => TestBed.configureTestingModule({
        imports: [
          BsDatepickerModule,
          BrowserAnimationsModule
        ]
      }).compileComponents()
    ));

  it('should returns ranges and values without changes', () => {
    const maxDate = new Date(new Date().setDate(new Date().getDate() + 4));
    const emptyRanges: BsCustomDates[] = [{
      label: '',
      value: []
    }];
    const emptyValues = null;
    const rangeResult = checkRangesWithMaxDate(emptyRanges, maxDate);
    const valuesResult = checkBsValue(emptyValues, maxDate);
    expect(JSON.stringify(rangeResult)).toEqual(JSON.stringify(emptyRanges));
    expect(valuesResult).toEqual(emptyValues);
  });

  it('should change range and value if it is later then maxDate, and check ranges', () => {
    const maxDate = new Date(new Date().setDate(new Date().getDate() + 4));
    const rangeResult = checkRangesWithMaxDate(ranges, maxDate);
    const valuesResult = checkBsValue(values, maxDate);
    expect(rangeResult[0].value[0]).toEqual(ranges[0].value[0]);
    expect(rangeResult[0].value[1]).toEqual(maxDate);
    expect(valuesResult[1]).toEqual(maxDate);
  });

  it('should return range and values without changes if maxDate is undefined', () => {
    const maxDate = undefined;
    const rangeResult = checkRangesWithMaxDate(ranges, maxDate);
    const valuesResult = checkBsValue(values, maxDate);
    expect(JSON.stringify(rangeResult)).toEqual(JSON.stringify(ranges));
    expect(JSON.stringify(valuesResult)).toEqual(JSON.stringify(values));
  });

  xit('should update time part of source date', () => {
    const date = new Date(2019, 1, 1, 12, 30, 59, 999);
    copyTime(date, new Date(2020, 1, 1, 0, 0, 0, 0));
    expect(date.getFullYear()).toEqual(2019);
    expect(date.getHours()).toEqual(0);
    expect(date.getMinutes()).toEqual(0);
    expect(date.getSeconds()).toEqual(0);
    expect(date.getMilliseconds()).toEqual(0);
  });
});
