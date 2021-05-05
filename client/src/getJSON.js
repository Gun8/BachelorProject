import React from "react";

const getData = async (url) => {
     let data = fetch(url);

     return await data.then((res) => res.json());
};

export {getData};