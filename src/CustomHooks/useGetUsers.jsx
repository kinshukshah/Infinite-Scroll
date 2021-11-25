import React, { useEffect, useState } from "react";
import axios from "axios";
export const useGetUsers = (pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://randomuser.me/api/",
      params: { results: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setUsers((prevUsers) => {
          return [
            ...new Set([
              ...prevUsers,
              ...res.data.results.map((b) => ({
                name: b.name.first,
                imgUrl: b.picture.thumbnail,
              })),
            ]),
          ];
        });
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(true);
      });

    return () => cancel();
  }, [pageNumber]);
  return {
    loading,
    error,
    users,
  };
};
