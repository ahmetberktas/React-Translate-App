import React, { useEffect, useMemo, useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/translateActions";
import Select from "react-select";

const App = () => {
  const state = useSelector((store) => store.translate);
  const dispatch = useDispatch();

  const [text, setText] = useState("");
  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, [dispatch]);

  /* Top-Level Code (Tekrar render olmaması için useMemo kullanıldı) */
  const refinedData = useMemo(
    () =>
      state.languages.map((lang) => ({
        label: lang.name,
        value: lang.code,
      })),
    [state.languages]
  );

  const handleSwap = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Linguify</h1>
        <div className="upper">
          <Select
            className="select"
            onChange={setSourceLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            value={sourceLang}
            options={refinedData}
          />
          <button onClick={handleSwap}>
            <FaExchangeAlt />
          </button>
          <Select
            className="select"
            onChange={setTargetLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            value={targetLang}
            options={refinedData}
          />
        </div>
        <div className="middle">
          <textarea onChange={(e) => setText(e.target.value)}></textarea>
          <textarea value={state.tranlatedText} disabled></textarea>
        </div>
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
        >
          Translate
        </button>
      </div>
    </div>
  );
};

export default App;
