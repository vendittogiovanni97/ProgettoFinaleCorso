const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Si è verificato un errore");
  }
  return response.json();
};

export default handleResponse;