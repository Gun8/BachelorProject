const getJSON = async (url) => {
     let data = fetch(url);

     return await data.then((res) => res.json());
};

export default getJSON;