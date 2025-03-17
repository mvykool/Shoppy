//we create a fetch api function with many fuctions within

//we set the URL which in
const API_URL = "http://localhost:5173/";
//let's set the defailt headers as well
const defaultHeaders = {
  "Content-type": "application/json",
};

//we create an async function, and we use a generic, that way we create a flexible function that will take the passed type, and also we return a promise with such type
async function fetchApiWithAuth<T>(
  //we pass the parameters necessary to fetch, and work with in this service, endpoint, and options
  endpoint: string,
  //we also set options to type RequestInit, requestinit is an object that contain things like body, methods, headers, and more things
  //the reason we set this as parameters is to allow to modify things like body, headers when this function is invoked
  options: RequestInit = {},
): Promise<T> {
  //let's combine the base URL with the given endpoint
  const url = `${API_URL}${endpoint}`;
  const response = await fetch(url, {
    // we copy everything from options
    ...options,
    // we only modify the haeders as we need to pass the default headers
    headers: {
      ...defaultHeaders,
      //in case we pass different headers via parameters when function is invoked, this will override the defaultHeaders
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  //now let's go and create some cases with IF statements
  if (!response.ok) {
    //let's wait for the error message and store it in a variable, so we can use it to display it
    const errorText = await response.text();
    //throw a new error and display it in console
    throw new Error(`request failed ${errorText}`);
  }

  //now if our request returns no content AKA status 204, let's just return an empty object
  if (response.status === 204) {
    //we return an empty object, this function expects a result type T, that's why we have to cast it, in order to avoid errors
    return {} as T;
  }

  //now let's actually return the data if it's successful with a trycatch
  try {
    //we wait for the return to be successfil and return it as JSON
    return await response.json();
  } catch (error) {
    //we will also return the error since we have to return something, even if it fails, and of course we cast T, since the promise has that type
    return { error } as T;
  }
}
