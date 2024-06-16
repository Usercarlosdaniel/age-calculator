import { useState } from "react";
import arrow from "../assets/img/icon-arrow.svg";

const monthsDays = {
  1: 31,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const AgeCalculator: React.FC = () => {
  const [days, setDays] = useState("");
  const [months, setMonths] = useState("");
  const [years, setYears] = useState("");

  const [resultDays, setResultDays] = useState("- -");
  const [resultMonths, setResultMonths] = useState("- -");
  const [resultYears, setResultYears] = useState("- -");

  const [invalidDays, setInvalidDays] = useState("");
  const [invalidMonths, setInvalidMonths] = useState("");
  const [invalidYears, setInvalidYears] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    let flagInvalid = false;
    e.preventDefault();

    if (!days) {
      setInvalidDays("require field");
      flagInvalid = true;
    } else if (days > monthsDays[String(months)] || days > 31) {
      setInvalidDays("Must be a valid day");
      flagInvalid = true;
    } else {
      setInvalidDays("");
    }

    if (!months) {
      setInvalidMonths("require field");
      flagInvalid = true;
    } else if (months > 12) {
      setInvalidMonths("Must be a valid month");
      flagInvalid = true;
    } else {
      setInvalidMonths("");
    }

    const currentDate = new Date();

    if (!years) {
      flagInvalid = true;
      setInvalidYears("require field");
    } else if (years > currentDate.getFullYear()) {
      setInvalidYears("Must be in past");
      flagInvalid = true;
    } else {
      setInvalidYears("");
    }

    const birthdayDate = new Date(`${years}-${months}-${days}`);

    if (birthdayDate > currentDate) {
      setInvalidDays("Must be in past");
      setInvalidMonths("Must be in past");
      setInvalidYears("Must be in past");
      flagInvalid = true;
    }

    if (flagInvalid === true) return;

    let resultYears = currentDate.getFullYear() - birthdayDate.getFullYear();
    let resultMonths = currentDate.getMonth() - birthdayDate.getMonth();
    let resultDays = currentDate.getDate() - birthdayDate.getDate();

    if (resultDays < 0) {
      resultMonths -= 1;
      resultDays += new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0,
      ).getDate();
    }

    if (resultMonths < 0) {
      resultYears -= 1;
      resultMonths += 12;
    }

    setInvalidDays(false);
    setInvalidMonths(false);
    setInvalidYears(false);

    setResultDays(resultDays.toString());
    setResultMonths(resultMonths.toString());
    setResultYears(resultYears.toString());
  };

  function handleDays(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.nativeEvent.data === ".") return;
    let value = e.target.value;
    setDays(() => (isNaN(value) ? days : Number(value)));
  }

  function handleMonths(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.nativeEvent.data === ".") return;

    let value = e.target.value;
    setMonths(() => (isNaN(value) ? months : Number(value)));
  }

  function handleYears(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.nativeEvent.data === ".") return;

    let value = e.target.value;
    setYears(() => (isNaN(value) ? years : Number(value)));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8 p-6">
        <div className="flex gap-5">
          <Input
            title="day"
            placeholder="dd"
            name="days"
            value={days}
            onchange={handleDays}
            validityState={invalidDays}
          />
          <Input
            title="month"
            placeholder="mm"
            name="months"
            value={months}
            onchange={handleMonths}
            validityState={invalidMonths}
          />
          <Input
            title="year"
            placeholder="yyyy"
            name="years"
            value={years}
            onchange={handleYears}
            validityState={invalidYears}
          />
        </div>
        <div className="relative mb-10 mt-4 w-full">
          <hr />
          <button className="absolute -top-7 left-28 rounded-full bg-primary-400 p-4 sm:-top-8 sm:left-3/4 sm:p-5 2xl:-top-10 2xl:p-6">
            <img src={arrow} alt="arrow icon" className="w-[30px] 2xl:w-10" />
          </button>
        </div>
        <div>
          <Result field="years" result={resultYears} />
          <Result field="months" result={resultMonths} />
          <Result field="days" result={resultDays} />
        </div>
      </div>
    </form>
  );
};

interface InputProps {
  title: string;
  name: string;
  value: string;
  placeholder: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validityState?: string;
}
interface resultProps {
  field: string;
  result: string;
}

const Input: React.FC<InputProps> = ({
  title,
  name,
  value,
  placeholder,
  onchange,
  validityState,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-xs font-bold uppercase tracking-widest text-smoke-grey"
      >
        {title}
      </label>
      <input
        name={name}
        id={name}
        value={value}
        type="text"
        placeholder={placeholder}
        onChange={onchange}
        className={
          validityState
            ? "w-[90px] rounded-lg border border-primary-200 p-3 text-lg font-extrabold text-of-black placeholder:text-lg placeholder:font-extrabold placeholder:uppercase placeholder:text-smoke-grey sm:w-[100px] 2xl:w-[110px]"
            : "w-[90px] rounded-lg border border-light-grey p-3 text-lg font-extrabold text-of-black placeholder:text-lg placeholder:font-extrabold placeholder:uppercase placeholder:text-smoke-grey sm:w-[100px] 2xl:w-[110px]"
        }
      />
      {validityState ? (
        <small className="text-xs italic text-primary-200">
          {validityState}
        </small>
      ) : (
        ""
      )}
    </div>
  );
};

const Result: React.FC<resultProps> = ({ field, result }) => {
  return (
    <div className="flex gap-2">
      <span className="mb-2 text-5xl font-extrabold text-primary-400 2xl:text-6xl">
        {result}
      </span>
      <h2 className="mb-2 text-5xl font-extrabold text-of-black">{field}</h2>
    </div>
  );
};

export default AgeCalculator;
