/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { createRef, useMemo, useState } from 'react';
import { IBook } from '@/../types/book';
import Select from 'react-select';
import Creatable from 'react-select/creatable';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import Toggle from 'react-toggle';

import 'react-day-picker/lib/style.css';

import styles from '@/styles/BookForm.module.css';
import { ratingOptions } from '@/helpers/book';

type BookFormProps = {
  book?: IBook;
  authors: string[];
  onSubmit: (form: any) => Promise<void>;
  onDelete?: () => void;
};

const BookForm = ({ authors, book, onSubmit, onDelete }: BookFormProps) => {
  const [title, setTitle] = useState<string>(book?.title || ``);
  const [author, setAuthor] = useState<string>(book?.author || ``);
  const [year, setYear] = useState<string>(book?.readIn || ``);
  const [comment, setComment] = useState<string>(book?.comment || ``);
  const [review, setReview] = useState<string>(book?.review || ``);
  const [currentlyReading, setCurrentlyReading] = useState<boolean>(
    Boolean(book?.currentlyReading) || false,
  );
  const [filePreview, setFilePreview] = useState<any>(book?.image?.url || ``);
  const [imageAsFile, setImageAsFile] = useState(undefined);
  const [date, setDate] = useState(
    book?.finishedDate ? new Date(book.finishedDate) : new Date(),
  );
  const file = createRef<HTMLInputElement>();

  const range = (start: number, stop: number, step: number) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step,
    );

  const yearsOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();

    return range(currentYear, 1996, -1).map((year) => ({
      value: year,
      label: year,
    }));
  }, []);

  const authorsOptions = useMemo(
    () => authors?.map((item) => ({ value: item, label: item })),
    [authors],
  );

  const handleChange = (event: any) => {
    setImageAsFile(event.target.files[0]);
    setFilePreview(URL.createObjectURL(event.target.files[0]));
  };

  const formReset = () => {
    setTitle(``);
    setAuthor(``);
    setYear(``);
    setComment(``);
    setReview(``);
    setCurrentlyReading(false);
    setFilePreview(``);
    setDate(new Date());
    setImageAsFile(undefined);
  };

  const handleOnSubmit = async () => {
    const payload = {
      title,
      author,
      comment,
      currentlyReading,
      review,
      readIn: year,
      finishedDate: date.toISOString(),
      image: {
        file: imageAsFile !== undefined ? imageAsFile : filePreview,
        alt: title,
      },
      createdAt: new Date().toISOString(),
      hasChangedCover: !!imageAsFile,
    };
    onSubmit(payload);
    if (!book) formReset();
  };

  const disableSubmit = useMemo(
    () =>
      title.length > 0 &&
      author.length > 0 &&
      review !== undefined &&
      year !== null &&
      !filePreview,
    [title, author, review, year, imageAsFile],
  );

  const handleToggle = (value: any) => {
    setCurrentlyReading(value.target.checked);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        <div className={styles.formImageContainer}>
          {/* https://fr.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag - fileInput.current.files[0].name */}
          <input
            className={styles.fileInput}
            type="file"
            ref={file}
            placeholder="cover"
            onChange={handleChange}
          />
          {!filePreview && (
            <div
              onClick={() => file?.current?.click()}
              className={styles.fakeFileInput}
            >
              <p>Click here to add the book cover</p>
            </div>
          )}
          {filePreview && (
            <img
              onClick={() => file?.current?.click()}
              className={styles.formImagePreview}
              src={filePreview}
              alt="Book cover preview"
            />
          )}
        </div>
        <div className={styles.oneCol}>
          <div className={styles.twoCols}>
            <input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <Creatable
              placeholder="Author"
              inputId="creatable"
              name="creatable"
              className="creatable"
              classNamePrefix="creatable"
              options={authorsOptions}
              defaultValue={authorsOptions.find(
                (item) => item.label === book?.author,
              )}
              onChange={(value: { label: string; value: string }) =>
                setAuthor(value.value)
              }
            />
          </div>
          <div className={styles.twoCols}>
            <Select
              placeholder="Read in"
              inputId="select"
              name="select"
              className="select"
              classNamePrefix="select"
              options={yearsOptions}
              defaultValue={yearsOptions.find(
                (item) => String(item.label) === String(book?.readIn),
              )}
              onChange={(value: { label: string; value: string }) =>
                setYear(value.value)
              }
            />
            <div className={styles.currentlyReading}>
              <Toggle
                defaultChecked={currentlyReading}
                icons={false}
                onChange={handleToggle}
              />
              <span>Currently reading this book</span>
            </div>
          </div>

          <div className={styles.twoCols}>
            <DayPickerInput value={date || undefined} onDayChange={setDate} />
            <Select
              placeholder="Rating of this book"
              inputId="rating"
              name="rating"
              className="rating"
              classNamePrefix="rating"
              options={ratingOptions}
              defaultValue={ratingOptions.find(
                (item) => String(item.label) === String(book?.review),
              )}
              onChange={(item: { label: string; value: string }) =>
                setReview(item.value)
              }
            />
          </div>
          <textarea
            className={styles.textarea}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment on the book"
          />
        </div>
      </div>
      <div className={styles.formFooter}>
        {book && (
          <div>
            <button onClick={onDelete} type="button">
              Delete book
            </button>
          </div>
        )}
        <div>
          <button
            disabled={disableSubmit}
            className={disableSubmit ? `btn-disabled` : ``}
            onClick={handleOnSubmit}
            type="submit"
          >
            {book ? `Edit book` : `Submit book`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
