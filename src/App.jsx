import React, { useEffect, useMemo, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages } from "./redux/translateActions";
import Select from "react-select";

const App = () => {
  const state = useSelector((store) => store.translate);
  const dispatch = useDispatch();

  const [sourceLang, setSoruceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  /* Top-Level Code (Tekrar render olmaması için useMemo kullanıldı) */
  const refinedData = useMemo(
    () =>
      state.languages.map((lang) => ({
        label: lang.name,
        value: lang.code,
      })),
    [state.languages]
  );

  return (
    <div id="main-page">
      <div className="container">
        <h1>Linguify</h1>
        <div className="upper">
          <Select
            className="select"
            onChange={setSoruceLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            value={sourceLang}
            options={refinedData}
          ></Select>
          <button>
            <FaExchangeAlt />
          </button>
          <Select
            className="select"
            onChange={setTargetLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            value={targetLang}
            options={refinedData}
          ></Select>
        </div>
        <div className="middle">
          <textarea></textarea>
          <textarea disabled></textarea>
        </div>
        <button>Translate</button>
      </div>
    </div>
  );
};

export default App;
