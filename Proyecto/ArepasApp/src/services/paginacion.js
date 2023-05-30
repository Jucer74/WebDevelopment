import BaseUrl from "./enviroment/enviroment";



export async function getAllWithPagination(entity, page, limit) {
    //const offset = (page - 1) * limit;
    const url = `${BaseUrl}/${entity}?_page=${page}&_limit=${limit}`;
   
    return await fetch(url)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }