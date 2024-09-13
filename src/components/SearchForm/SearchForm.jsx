import toast, { Toaster } from "react-hot-toast";

import css from "./SearchForm.module.css";

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchTerm = form.elements.query.value.trim();

    if (!searchTerm) {
      const notify = () =>
        toast("Please enter the search term!", {
          duration: 2000,
          position: "top-center",
          style: {
            marginTop: 50,
            color: "#d41c00",
            fontWeight: "semi-bold",
          },
        });
      notify();
      return;
    }

    onSubmit(searchTerm);
    form.reset();
  };
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputWrapper}>
        <input
          className={css.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search"
        />
        <button className={css.btn} type="submit">
          🔍
        </button>
      </div>
      <Toaster />
    </form>
  );
};

export default SearchForm;
