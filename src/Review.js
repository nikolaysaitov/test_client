import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function Review() {
  // Рейтинг
  const [rating, setRating] = useState(0);
  const [submittedRating, setSubmittedRating] = useState(false);

  // Текст
  const [text, setText] = useState("");

  // Состояние для хранения статуса отправки данных и сообщения об ошибке
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const buttonDisabled = !submittedRating;


  const handleRating = (rate) => {
    setRating(rate);
    setSubmittedRating(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submittedRating) {
      setSubmitting(true); // устанавливаем флаг состояния отправки данных на сервер
      const data = { rating: rating, text: text };
      console.log("Отправленные данные:", data);
      fetch("/api/submitReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Успех:", data);
          setSubmitting(false); // сбрасываем флаг состояния отправки данных на сервер
        })
        .catch((error) => {
          console.error("Ошибка:", error);
          setSubmitError("Ошибка при отправке данных"); // устанавливаем сообщение об ошибке
          setSubmitting(false);
        });
    }
  };

  return (
    <div>
      <form className="review__form" onSubmit={handleSubmit}>
      <h2 className="title__review" >Оцените наш сервис</h2>
        <Rating onClick={handleRating} />
        <label className="label__review">
          
          <textarea className="textarea__review" value={text} onChange={(e) => setText(e.target.value)} placeholder="Ваш комментарий" />
        </label>
        <button type="submit" className={`submit__review ${buttonDisabled ? 'disabled-button' : ''}`} disabled={buttonDisabled}>Отправить</button>
        {submitting && <p>Отправляем...</p>}
        {submitError && <p>{submitError}</p>}
      </form>
    </div>
  );
}
