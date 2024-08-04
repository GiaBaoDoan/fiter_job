import { useEffect, useState } from "react";
import "./App.css";
import listJob from "./data/data.json";
import { JobType } from "./types";

function App() {
  const [filterData, setFilterData] = useState<JobType[]>([]);
  const [keywords, setKeyWords] = useState<string[]>([]);
  const handelKeyWords = (keyword: string) => {
    const index = keywords.indexOf(keyword);
    if (!keyword[index]) {
      setKeyWords([...keywords, keyword]);
    }
  };
  const removeKeyWords = (key: string) => {
    const newKey = [...keywords];
    const index = newKey.indexOf(key);
    newKey.splice(index, 1);
    setKeyWords(newKey);
  };
  const handelFilterData = () => {
    if (keywords.length > 0) {
      const newData = listJob.filter((d) => {
        return keywords.every((key: string) => {
          return (
            d.role === key ||
            d.level === key ||
            d.languages.includes(key) ||
            d.tools.includes(key)
          );
        });
      });
      setFilterData(newData);
    } else {
      setFilterData(listJob);
    }
  };

  useEffect(() => {
    handelFilterData();
  }, [keywords.length]);

  return (
    <div className="bg-cyan-50 min-h-screen">
      <div className="bg-cyan-700">
        <picture>
          <source
            media="(min-width:768px)"
            srcSet="./images/bg-header-desktop.svg"
          />
          <img
            src="./images/bg-header-mobile.svg"
            className="min-h-[10rem] object-cover"
            alt=""
          />
        </picture>
      </div>
      <section className="max-width py-10 mt-10 flex flex-col gap-10">
        {keywords.length > 0 && (
          <div className="flex justify-between min-h-[80px]  translate-y-[-50%]   z-1 rounded-lg bg-white shadow p-5">
            <div className="filter-item flex-wrap flex gap-5">
              {keywords.map((key, index) => {
                return (
                  <div key={index} className="flex rounded overflow-hidden">
                    <span className="bg-cyan-50 max-sm:text-xs text-sm text-cyan-700 inline-flex items-center px-3 p-1">
                      {key}
                    </span>
                    <button
                      onClick={() => removeKeyWords(key)}
                      className="bg-cyan-600 cursor-pointer hover:bg-black object-contain p-1 px-2"
                    >
                      <img src="images/icon-remove.svg" alt="" />
                    </button>
                  </div>
                );
              })}
            </div>
            <button
              onClick={() => setKeyWords([])}
              className="text-cyan-600 hover:underline"
            >
              Clear
            </button>
          </div>
        )}
        {filterData.map((job, index) => {
          return (
            <div
              key={index}
              className={`${
                (job.id === 1 || job.id === 2) &&
                "border-l-[6px] border-cyan-600"
              } bg-white p-10 max-sm:p-5 shadow-lg flex max-lg:flex-col max-lg:items-start  gap-5 justify-between items-center rounded-lg`}
            >
              <div className="flex gap-5 max-md:flex-col items-start">
                <img
                  src={job.logo}
                  className="object-contain max-sm:-mt-12 max-md:-mt-16 max-md:w-[60px]"
                  alt="logo"
                />
                <article className="flex flex-col gap-3">
                  <div className="flex gap-3 items-center">
                    <span className="text-cyan-500 font-bold text-sm">
                      {job.company}
                    </span>
                    {job.new && (
                      <span className="style !bg-cyan-600">new!</span>
                    )}
                    {job.featured && <span className="style ">featured</span>}
                  </div>
                  <p className="text-slate-800 font-bold">{job.position}</p>
                  <ul className="flex text-gray-400 text-sm gap-10">
                    <li>
                      <span>{job.postedAt}</span>
                    </li>
                    <li>
                      <span>{job.location}</span>
                    </li>
                    <li>
                      <span>{job.contract}</span>
                    </li>
                  </ul>
                </article>
              </div>
              <div className="flex flex-wrap gap-5">
                {job.languages.map((lan, index) => {
                  return (
                    <button onClick={() => handelKeyWords(lan)} key={index}>
                      <span className="style-job">{lan}</span>
                    </button>
                  );
                })}
                {job.tools.map((tool, index) => {
                  return (
                    <button onClick={() => handelKeyWords(tool)} key={index}>
                      <span className="style-job">{tool}</span>
                    </button>
                  );
                })}
                <button onClick={() => handelKeyWords(job.role)}>
                  <span className="style-job">{job.role}</span>
                </button>
                <button onClick={() => handelKeyWords(job.level)}>
                  <span className="style-job">{job.level}</span>
                </button>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default App;
