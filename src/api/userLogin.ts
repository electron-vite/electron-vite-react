export interface LoginResponse {
    code: number;
    status: string;
    payload: {
      BearerToken: string;
    };
  }

export const loginUser = async (credentials: {
    usrcde: string;
    usrpwd: string;
  }): Promise<LoginResponse> => {
    const response = await fetch("http://localhost:8080/api/user-ess/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
  
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  };