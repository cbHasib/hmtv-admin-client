import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - HmTv`;
  }, [title]);
};

export default useTitle;
