import React, { useEffect, useState } from "react";

function Test() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=Gaza&language=ar&apiKey=af7fcad65adb4774bd67ad77d15dda8f"
    )
      .then((res) => res.json())
      .then((data) => {
        const slicedArticles = data.articles.slice(1, 9);
        console.log(slicedArticles[0].title);
        setData(slicedArticles)
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div>
        {data.map((title,index)=> (
          <li key={index}>
           <h1>{title.title}</h1>
          </li>
        ))}
      </div>
    </>
  );
}

export default Test;
