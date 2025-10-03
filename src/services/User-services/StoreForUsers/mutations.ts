import { useMutation } from "@tanstack/react-query";
import { FilterProductsStore } from "./api";

const useFilterProductsStoreMutation = () => {
  return useMutation({
    mutationFn: (formData: FormData) => FilterProductsStore(formData),
  });
};

export default useFilterProductsStoreMutation;
