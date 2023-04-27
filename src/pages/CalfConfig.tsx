import { useEffect } from "react";
import {
  CalfConfig,
  ConfigStatus,
  ConfigType,
  fetchedConfig,
  setConfigNickname,
  setConfigStatus,
  setConfigSubtitle,
  setConfigTitle,
} from "../store/configSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useParams } from "react-router-dom";
import { fetchCalfConfig, writeCalfConfig } from "../utils/apiConnector";

interface EditableConfigPageProps {
  config: CalfConfig;
}

interface InputWithLabelProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const InputWithLabel = ({ label, value, onChange }: InputWithLabelProps) => {
  return (
    <div className="flex flex-col">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="arnold schwarzcalfer"
        defaultValue={value}
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
  const configType = useAppSelector((state) => state.config.configType);
  const calfConfigStatus = useAppSelector((state) => state.config.status);

  const onSubmit = async () => {
    try {
      dispatch(setConfigStatus(ConfigStatus.Saving));
      await writeCalfConfig(config, configType === ConfigType.Existing);
      dispatch(setConfigStatus(ConfigStatus.Saved));
    } catch (e) {
      dispatch(setConfigStatus(ConfigStatus.Error));
    }
  };

  return (
    <div className="flex flex-col w-full items-center gap-8">
      <div className="flex flex-col w-1/2 gap-4">
        <InputWithLabel
          label="Nickname"
          value={config.nickname}
          onChange={(value: string) => dispatch(setConfigNickname(value))}
        />
        <InputWithLabel
          label="Title"
          value={config.title}
          onChange={(value: string) => dispatch(setConfigTitle(value))}
        />
        <InputWithLabel
          label="Subtitle"
          value={config.subtitle}
          onChange={(value: string) => dispatch(setConfigSubtitle(value))}
        />
      </div>

      <button
        onClick={onSubmit}
        className="flex flex-row items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={calfConfigStatus === ConfigStatus.Saving}
      >
        {calfConfigStatus === ConfigStatus.Saving && <LoadingGlyph />}
        {calfConfigStatus === ConfigStatus.Saving
          ? "Saving"
          : calfConfigStatus === ConfigStatus.Saved
          ? "Saved!"
          : "Save"}
      </button>
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

    fetchConfig();
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
