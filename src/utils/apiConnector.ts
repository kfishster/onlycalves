import { CalfConfig } from "../store/configSlice";

const apiRoot = process.env.REACT_APP_API_URL;

export interface CalfConfigError {
  error: string;
}

export interface WriteCalfConfigResponse {
  versionId: string;
}

export const fetchCalfConfig = async (
  userId: string
): Promise<CalfConfig | CalfConfigError> => {
  try {
    const res = await fetch(`${apiRoot}/getCalfConfig`, {
      method: "POST",
      body: JSON.stringify({ userId: userId }),
    });
    const calfConfig = (await res.json()) as CalfConfig;
    return calfConfig;
  } catch (e) {
    throw Error("Config couldn't be loaded");
  }
};

export const writeCalfConfig = async (
  config: CalfConfig,
  isUpdate: boolean
): Promise<WriteCalfConfigResponse | CalfConfigError> => {
  try {
    const res = await fetch(`${apiRoot}/addCalfConfig`, {
      method: "POST",
      body: JSON.stringify({ ...config, isUpdate }),
    });
    const writeResponse = (await res.json()) as WriteCalfConfigResponse;
    return writeResponse;
  } catch (e) {
    throw Error("Config couldn't be loaded");
  }
};
