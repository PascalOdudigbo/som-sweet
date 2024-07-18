import { CategoryType } from "./allModelTypes";

// A function to handle image file changes
export const handleImageFileChangeCategory = (event: React.ChangeEvent<HTMLInputElement>, setSelectedImageFile: React.Dispatch<React.SetStateAction<File | null | undefined>>, category: Partial<CategoryType>, setCategory: React.Dispatch<React.SetStateAction<Partial<CategoryType>>>) => {
    // This returns a FileList object
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
        // Get the first file from the FileList
        const file = fileList[0];
        // Update the state with the selected file
        setSelectedImageFile(file);
        setCategory({ ...category, image: URL.createObjectURL(file) });
    }
}