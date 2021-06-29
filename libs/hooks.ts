import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "@/store/hooks";
import { Loads } from "@/store/slices/load";

export function useServerInitial(names: Loads[]) {
  const router = useRouter();

  const needLoads = useSelector((state) =>
    names.filter((n) => !state.load.loaded[n])
  );

  const reload = useCallback((loads: Loads[]) => {
    router.push(`${router.route}?initial=${loads.join(",")}`, router.route);
  }, []);

  useEffect(() => {
    if (router.query["initial"]) {
      router.push(router.route);
    }

    if (needLoads.length > 0) {
      reload(needLoads);
    }
  }, [router.query, needLoads]);

  return { reload, loadURL: `${router.route}?initial=${names.join(",")}` };
}

export function useRequiredAuth(loginPath = "/login") {
  const router = useRouter();
  let user = "";
  if (typeof window !== "undefined") {
    user = localStorage.getItem("logged");
  }
  const token = useSelector((state) => state.session.token);

  useEffect(() => {
    if (!token && !user) {
      router.push(loginPath);
    }
  }, [token]);
}

export function useGuest(redirectPath = "/") {
  const router = useRouter();
  const token = useSelector((state) => state.session.token);

  useEffect(() => {
    if (token) {
      router.push(redirectPath);
    }
  }, [token]);
}
