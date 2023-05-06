import { ChangeEvent, useEffect, useState } from "react";
import {
  CalfConfig,
  CalfPicture,
  CalfPictureStatus,
  ConfigStatus,
  ConfigType,
  addPicture,
  deletePicture,
  fetchedConfig,
  fetchedPictures,
  newUser,
  removePicture,
  setConfigNickname,
  setConfigStatus,
  setConfigSubtitle,
  setConfigTitle,
  setPictureStatus,
} from "../store/configSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useParams } from "react-router-dom";
import {
  deleteCalfPicture,
  fetchCalfConfig,
  fetchPictures,
  uploadPicture,
  writeCalfConfig,
} from "../utils/apiConnector";

interface EditableConfigPageProps {
  config: CalfConfig;
}

interface InputWithLabelProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

interface PictureFrameProps {
  pictureUrl: string;
  onDelete?: () => void;
}

const PictureFrame = ({ pictureUrl, onDelete }: PictureFrameProps) => {
  return (
    <div className="flex flex-1 h-full rounded-xl overflow-clip">
      <img src={pictureUrl} className="flex w-full object-cover" />
      <div className="flex flex-col-reverse relative">
        <button
          onClick={onDelete}
          className="bottom-2 right-2 absolute w-6 h-6 hover:scale-125"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 stroke-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const PictureSelection = () => {
  const dispatch = useAppDispatch();
  const pictures = useAppSelector((state) => state.config.pictures);
  const userId = useAppSelector((state) => state.config.config?.userId);

  const onNewPicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const pictureData = URL.createObjectURL(file);
      console.log(file);
      dispatch(
        addPicture({
          pictureUrl: pictureData,
          pictureStatus: CalfPictureStatus.Local,
          file: file,
          name: file.name,
        })
      );
    }
  };

  return (
    <div className="flex flex-row items-center justify-center w-full h-72">
      <div className="flex flex-row gap-4 items-center justify-center h-full">
        {pictures
          .filter((p) => p.pictureStatus !== CalfPictureStatus.Delete)
          .map((picture) => (
            <PictureFrame
              pictureUrl={picture.pictureUrl}
              onDelete={() => dispatch(deletePicture(picture.pictureUrl))}
              //   onDelete={() =>
              //     picture.file && userId && uploadPicture(userId, picture.file)
              //   }
            />
          ))}
        <label className="flex flex-1 h-full flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <svg
              aria-hidden="true"
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              PNG or JPG pls
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={onNewPicture}
          />
        </label>
      </div>
    </div>
  );
};

const InputWithLabel = ({
  label,
  value,
  placeholder,
  onChange,
}: InputWithLabelProps) => {
  return (
    <div className="flex flex-col">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.value)
        }
      />
    </div>
  );
};

const LoadingGlyph = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};

export const EditableConfigPage = ({ config }: EditableConfigPageProps) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.config.config?.userId);
  const configType = useAppSelector((state) => state.config.configType);
  const calfConfigStatus = useAppSelector((state) => state.config.status);
  const pictures = useAppSelector((state) => state.config.pictures);

  const onSubmit = async () => {
    try {
      dispatch(setConfigStatus(ConfigStatus.Saving));
      await writeCalfConfig(config, configType === ConfigType.Existing);
      for (const picture of pictures) {
        if (
          userId &&
          picture.file &&
          picture.pictureStatus === CalfPictureStatus.Local
        ) {
          dispatch(
            setPictureStatus({
              status: CalfPictureStatus.UploadInProgress,
              pictureUrl: picture.pictureUrl,
            })
          );
          await uploadPicture(userId, picture.file);
          // set status
          dispatch(
            setPictureStatus({
              status: CalfPictureStatus.Uploaded,
              pictureUrl: picture.pictureUrl,
            })
          );
        } else if (
          userId &&
          picture.name &&
          picture.pictureStatus === CalfPictureStatus.Delete
        ) {
          await deleteCalfPicture(userId, picture.name);
          // set status
          dispatch(removePicture(picture.pictureUrl));
        }
      }

      dispatch(setConfigStatus(ConfigStatus.Saved));
    } catch (e) {
      dispatch(setConfigStatus(ConfigStatus.Error));
    }
  };

  const renderSaveButton = (
    calfConfigStatus: ConfigStatus,
    pictures: CalfPicture[]
  ) => {
    const uploadedAllPictures = pictures.every(
      (p) => p.pictureStatus === CalfPictureStatus.Uploaded
    );

    const uploadInProgress = pictures.some(
      (p) => p.pictureStatus === CalfPictureStatus.UploadInProgress
    );

    let showLoadingGlyph = false;
    let buttonText = "Save";

    if (calfConfigStatus === ConfigStatus.Saving) {
      buttonText = "Saving Config...";
      showLoadingGlyph = true;
    } else if (uploadInProgress) {
      buttonText = "Uploading pictures..";
      showLoadingGlyph = true;
    } else if (calfConfigStatus === ConfigStatus.Saved && uploadedAllPictures) {
      buttonText = "Saved!";
      showLoadingGlyph = false;
    }

    return (
      <button
        onClick={onSubmit}
        className="flex flex-row items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={showLoadingGlyph}
      >
        {showLoadingGlyph && <LoadingGlyph />}
        {buttonText}
      </button>
    );
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <div className="flex flex-col w-1/2 gap-4">
        <InputWithLabel
          label="Nickname"
          value={config.nickname}
          placeholder="arnold schwarzcalfer"
          onChange={(value: string) => dispatch(setConfigNickname(value))}
        />
        <InputWithLabel
          label="Title"
          value={config.title}
          placeholder="the golden calf"
          onChange={(value: string) => dispatch(setConfigTitle(value))}
        />
        <InputWithLabel
          label="Subtitle"
          value={config.subtitle}
          placeholder="leg day everyday"
          onChange={(value: string) => dispatch(setConfigSubtitle(value))}
        />
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Pictures
        </label>
        <PictureSelection />
      </div>

      {renderSaveButton(calfConfigStatus, pictures)}
    </div>
  );
};

export const CalfConfigPage = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const calfConfig = useAppSelector((state) => state.config.config);
  const calfConfigStatus = useAppSelector((state) => state.config.status);

  useEffect(() => {
    const fetchConfig = async () => {
      if (params && params.userId) {
        dispatch(setConfigStatus(ConfigStatus.Loading));
        const calfConfig = await fetchCalfConfig(params.userId);

        if ("error" in calfConfig) {
          dispatch(setConfigStatus(ConfigStatus.Error));
        } else {
          dispatch(fetchedConfig(calfConfig));
        }
      } else {
        dispatch(setConfigStatus(ConfigStatus.Error));
      }
    };

    const fetchCalfPictures = async () => {
      if (params && params.userId) {
        const calfPictures = await fetchPictures(params.userId);

        if (!("error" in calfPictures)) {
          dispatch(
            fetchedPictures(
              calfPictures.map((p) => ({
                name: p.name,
                pictureUrl: `${p.containerUrl}/${p.name}`,
                pictureStatus: CalfPictureStatus.Uploaded,
              }))
            )
          );
        }
      }
    };

    if (
      calfConfigStatus !== ConfigStatus.Ready ||
      (params && params.userId && params.userId !== calfConfig?.userId)
    ) {
      //   dispatch(newUser("asd"));
      fetchConfig();
      fetchCalfPictures();
    }
  }, [dispatch, params]);

  const showConfigPage = (
    status: ConfigStatus,
    config?: CalfConfig
  ): JSX.Element => {
    switch (status) {
      case ConfigStatus.Loading:
        return <div>Loading...</div>;
      case ConfigStatus.Error:
        return <div>Something went wrong</div>;
      default:
        return (
          <div className="flex w-full">
            {config && <EditableConfigPage config={config} />}
          </div>
        );
    }
  };

  return (
    <div className="flex w-full">
      {showConfigPage(calfConfigStatus, calfConfig)}
    </div>
  );
};
