/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useMemo } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
} from 'react-vis';

import 'react-day-picker/lib/style.css';

import { IBook } from '@/../types/book';

type BookByYearchartProps = {
  books?: IBook[];
};

const BookByYearchart = ({ books }: BookByYearchartProps) => {
  const allYears = useMemo(() => {
    if (books) {
      const temp = [...books.filter((book) => book?.readIn)];
      return [
        ...new Set(temp.map((book) => String(book.readIn))),
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
  return (
    <div className="chart">
      <h3>Books read by year</h3>
      <XYPlot xType="ordinal" width={600} height={300} xDistance={100}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries color="black" data={data} />
      </XYPlot>
    </div>
  );
};

export default BookByYearchart;
