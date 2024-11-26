import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from "react-redux";
import { AppDispatch, RootState } from "../store";

export const useSelector = useSelectorBase.withTypes<RootState>();
export const useDispatch = useDispatchBase.withTypes<AppDispatch>();
