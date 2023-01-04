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
import { getAuthorsFromBooks } from '@/helpers/book';

type MostReadAuthorBarChartProps = {
  books: IBook[];
};

const MostReadAuthorBarChart = ({ books }: MostReadAuthorBarChartProps) => {
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

  const allAuthors = useMemo(() => getAuthorsFromBooks(books), [books]);

  const booksByAuthors = useMemo(
    () =>
      allAuthors.map((author) =>
        books?.filter((book) => book.author === author),
      ),
    [allYears, books],
  );

  const data = useMemo(
    () =>
      booksByAuthors
        .map((item, index) => {
          if (item?.length > 3) {
            return {
              x: allAuthors[index],
              y: item?.length,
            };
          }
          return undefined;
        })
        .filter((item) => !!item),
    [booksByAuthors],
  );
  return (
    <div className="chart">
      <h3>Books read by author</h3>
      <div className="chart-container">
        <XYPlot
          margin={{ bottom: 150, left: 50 }}
          xType="ordinal"
          width={800}
          height={400}
          xDistance={100}
        >
          <VerticalGridLines style={{ stroke: `rgba(255,255,255,0.4)` }} />
          <HorizontalGridLines style={{ stroke: `rgba(255,255,255,0.4)` }} />
          <XAxis tickLabelAngle={-65} style={{ text: { fill: `white` } }} />
          <YAxis style={{ text: { fill: `white` } }} />
          <VerticalBarSeries
            barWidth={0.6}
            color="#d74528"
            data={data as any}
          />
        </XYPlot>
      </div>
    </div>
  );
};

export default MostReadAuthorBarChart;
