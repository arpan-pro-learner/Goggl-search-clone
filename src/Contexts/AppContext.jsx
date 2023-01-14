const baseContext = {
  searchTerm: '',
  isLoading: true,
  result: null,
  getResult: async (pathname, searchTerm) => {
    console.log("In Context", pathname, searchTerm);
    let url;

    if (pathname === "/search") {
      url = `api/Search/WebSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=10&autoCorrect=true`;
    } else if (pathname === "/images") {
      url = `api/Search/ImageSearchAPI?q=${searchTerm}&pageNumber=1&pageSize=40&autoCorrect=true&safeSearch=true`;
    } else {
      return null;
    }

    const response = await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    });
    
    return await response.json();
  }
}