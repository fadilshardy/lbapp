import * as React from 'react';

interface ILoadingProps {}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <svg className="animate-spin h-8 w-8 text-gray-500 mx-auto" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 004 12H0c0 3.042.54 5.978 1.514 8.709l4.472-1.789zM20 12a8 8 0 01-8 8v-4c2.485 0 4.897-.924 6.718-2.605l1.79 4.473A7.962 7.962 0 0020 12z"
          />
        </svg>
        <p className="mt-2 text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
