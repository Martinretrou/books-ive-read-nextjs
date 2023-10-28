/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo, useState } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  Hint,
} from 'react-vis';

import 'react-day-picker/lib/style.css';

import { IBook } from '@/../types/book';

type BookByYearchartProps = {
  books?: IBook[];
};

const BookByYearchart = ({ books }: BookByYearchartProps) => {
  const [tooltip, setTooltip] = useState<{
    x: string | number;
    y: string | number;
  } | null>(null);

  const allYears = useMemo(() => {
    if (books) {
      const temp = [...books.filter((book) => book?.readIn)];
      return [
        ...new Set(temp.map((book) => String(book.readIn))),
        // eslint-disable-next-line no-nested-ternary
      ].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
    }
    return [];
  }, [books]);

  const booksByYear = useMemo(
    () =>
      allYears.map((year) =>
        books?.filter((book) => String(book.readIn) === year),
      ),
    [allYears, books],
  );

  const data = useMemo(
    () =>
      booksByYear.map((item, index) => ({
        x: allYears[index],
        y: item?.length,
      })),
    [booksByYear],
  );

  const onMouseOver = (value: { x: string | number; y: string | number }) => {
    setTooltip(value);
  };

  const onMouseOut = () => {
    setTooltip(null);
  };

  return (
    <div className="chart">
      <h3>Books read by year</h3>
      <XYPlot xType="ordinal" width={600} height={300} xDistance={100}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries
          onValueMouseOver={onMouseOver}
          onValueMouseOut={onMouseOut}
          barWidth={0.6}
          color="black"
          data={data as any}
        />
        {tooltip && (
          <Hint value={tooltip}>
            <div className="chart-tooltip">
              <p>{tooltip.y} books</p>
            </div>
          </Hint>
        )}
      </XYPlot>
    </div>
  );
};

export default BookByYearchart;
