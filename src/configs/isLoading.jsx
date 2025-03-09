import React from 'react';

const IsLoading = () => {
  return (
    <div className="fixed inset-0 z-[1000px] flex items-center justify-center bg-black bg-opacity-75 ">
      <div className="loader-inner relative h-[60px] w-[100px]">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="loader-line-wrap absolute left-0 top-0 h-[50px] w-[100px] origin-[50%_100%] overflow-hidden"
            style={{
              animation: `spin 2000ms cubic-bezier(.175, .885, .32, 1.275) infinite`,
              animationDelay: `-${50 * (index + 1)}ms`,
            }}
          >
            <div
              className="loader-line absolute left-0 right-0 top-0 m-auto h-[100px] w-[100px] rounded-full border-4 border-transparent"
              style={{
                borderColor: `hsl(${index * 60}, 80%, 60%)`,
                height: `${90 - index * 14}px`,
                width: `${90 - index * 14}px`,
                top: `${7 + index * 7}px`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IsLoading;