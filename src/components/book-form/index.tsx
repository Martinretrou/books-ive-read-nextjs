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
  onSubmit: (form: any) => void;
};

const BookForm = ({ authors, book, onSubmit }: BookFormProps) => {
  const [title, setTitle] = useState<string>(book?.title || ``);
  const [author, setAuthor] = useState<string>(book?.author || ``);
  const [year, setYear] = useState<string>(book?.readIn || ``);
  const [comment, setComment] = useState<string>(book?.comment || ``);
  const [review, setReview] = useState<string>(book?.review || ``);
  const [currentlyReading, setCurrentlyReading] = useState<boolean>(
    book?.currentlyReading || false,
  );
  const [filePreview, setFilePreview] = useState<any>(book?.image.url || ``);
  const [imageAsFile, setImageAsFile] = useState(``);
  const [date, setDate] = useState(new Date());
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

  const handleOnSubmit = () => {
    const payload = {
      title,
      author,
      comment,
      review,
      readIn: year,
      publicationDate: date,
      image: {
        file: imageAsFile,
        alt: title,
      },
      created_at: new Date(),
    };
    onSubmit(payload);
  };

  const disableSubmit = useMemo(
    () =>
      title.length > 0 &&
      author.length > 0 &&
      review !== undefined &&
      year !== null &&
      !imageAsFile,
    [title, author, review, year, imageAsFile],
  );

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
              onClick={() => file.current.click()}
              className={styles.fakeFileInput}
            >
              <p>Click here to add the book cover</p>
            </div>
          )}
          {filePreview && (
            <img
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
              onChange={(value: { label: string; value: string }) =>
                setYear(value.value)
              }
            />
            <div className={styles.currentlyReading}>
              <Toggle
                defaultChecked={currentlyReading}
                icons={false}
                onChange={setCurrentlyReading}
              />
              <span>Currently reading this book</span>
            </div>
          </div>

          <div className={styles.twoCols}>
            <DayPickerInput onDayChange={setDate} />
            <Select
              placeholder="Rating of this book"
              inputId="rating"
              name="rating"
              className="rating"
              classNamePrefix="rating"
              options={ratingOptions}
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
        <div>
          <button
            disabled={disableSubmit}
            className={disableSubmit ? `btn-disabled` : ``}
            onClick={handleOnSubmit}
            type="submit"
          >
            Submit book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
