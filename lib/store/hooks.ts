import { useDispatch as useDispatchBase, useSelector as useSelectorBase } from "react-redux";
import { AppDispatch, RootState } from ".";

export const useSelector = useSelectorBase.withTypes<RootState>();
export const useDispatch = useDispatchBase.withTypes<AppDispatch>();
