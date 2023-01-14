import { useQuery } from "@tanstack/react-query";
import getTodos from "../api/todo/getTodos";

export const useTodosQuery = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
};
