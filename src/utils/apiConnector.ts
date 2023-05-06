import { VotingCard } from "../store/cardsSlice";
import { CalfConfig } from "../store/configSlice";
import { CalfUser } from "../store/usersSlice";

const apiRoot = process.env.REACT_APP_API_URL;

export interface CalfConfigError {
  error: string;
}

export interface WriteCalfConfigResponse {
  versionId: string;
}

export interface CalfPictureResponseProperties {
  createdOn: Date;
  lastModified: Date;
}

export interface CalfPictureResponse {
  name: string;
  properties: CalfPictureResponseProperties;
  containerUrl: string;
}

export type MatchupResponse = CalfConfig & CalfPictureResponse;

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

export const fetchUsers = async (): Promise<CalfUser[] | CalfConfigError> => {
  try {
    const res = await fetch(`${apiRoot}/getUsers`, {
      method: "POST",
    });
    const users = (await res.json()) as CalfUser[];
    return users;
  } catch (e) {
    throw Error("Users couldn't be loaded");
  }
};

export const writeCalfConfig = async (
  config: CalfConfig,
  isUpdate: boolean
): Promise<WriteCalfConfigResponse | CalfConfigError> => {
  try {
    const res = await fetch(`${apiRoot}/writeCalfConfig`, {
      method: "POST",
      body: JSON.stringify({ ...config, isUpdate }),
    });
    const writeResponse = (await res.json()) as WriteCalfConfigResponse;
    return writeResponse;
  } catch (e) {
    throw Error("Config couldn't be loaded");
  }
};

export const uploadPicture = async (
  userId: string,
  picture: File
): Promise<void | CalfConfigError> => {
  try {
    const formData = new FormData();

    formData.append("File", picture);

    fetch(`${apiRoot}/addCalfPicture`, {
      method: "POST",
      body: formData,
      headers: {
        userId: userId,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (e) {
    throw Error("Picture couldn't be uploaded");
  }
};

export const fetchPictures = async (
  userId: string
): Promise<CalfPictureResponse[] | CalfConfigError> => {
  try {
    const res = await fetch(`${apiRoot}/getCalfPictures`, {
      method: "POST",
      body: JSON.stringify({ userId: userId }),
    });
    const pictures = (await res.json()) as CalfPictureResponse[];
    return pictures;
  } catch (e) {
    throw Error("Pictures couldn't be fetched");
  }
};

export const fetchRandomMatchup = async (): Promise<
  MatchupResponse[] | CalfConfigError
> => {
  try {
    const res = await fetch(`${apiRoot}/getMatchup`, {
      method: "POST",
    });
    const matchups = (await res.json()) as MatchupResponse[];
    return matchups;
  } catch (e) {
    throw Error("Pictures couldn't be fetched");
  }
};

export const deleteCalfPicture = async (
  userId: string,
  name: string
): Promise<void | CalfConfigError> => {
  try {
    const res = await fetch(`${apiRoot}/deleteCalfPicture`, {
      method: "POST",
      body: JSON.stringify({ userId, name }),
    });
    await res.json();
  } catch (e) {
    throw Error("Pictures couldn't be fetched");
  }
};
